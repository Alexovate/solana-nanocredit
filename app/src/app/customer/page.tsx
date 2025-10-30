'use client'

import { useState, useEffect } from 'react'
import { Keypair, PublicKey } from '@solana/web3.js'
import { getSocket } from '@/lib/socketClient'
import * as nacl from 'tweetnacl'

type DetectedMerchant = {
  merchantPubkey: string
  rssi: number
  timestamp: number
  nonce: string
}

type ActivityLog = {
  time: string
  message: string
  type: 'info' | 'success' | 'warning'
}

export default function CustomerPage() {
  const [keypair, setKeypair] = useState<Keypair | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [merchants, setMerchants] = useState<DetectedMerchant[]>([])
  const [selectedMerchant, setSelectedMerchant] = useState<DetectedMerchant | null>(null)
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([])
  const [currentStep, setCurrentStep] = useState(0) // 0: scan, 1: select, 2: proof, 3: submit

  useEffect(() => {
    const kp = Keypair.generate()
    setKeypair(kp)
    addLog('Customer wallet generated', 'success')
  }, [])

  useEffect(() => {
    if (!isScanning) return

    const socket = getSocket()

    socket.on('merchant:detected', (data: DetectedMerchant) => {
      console.log('🏪 Merchant detected:', data)
      setMerchants(prev => {
        const existing = prev.find(m => m.merchantPubkey === data.merchantPubkey)
        if (!existing) {
          addLog(`New merchant detected: ${data.merchantPubkey.substring(0, 8)}... (${data.rssi} dBm)`, 'info')
        }
        if (existing) {
          return prev.map(m => 
            m.merchantPubkey === data.merchantPubkey ? data : m
          )
        }
        return [...prev, data]
      })
    })

    return () => {
      socket.off('merchant:detected')
    }
  }, [isScanning])

  const addLog = (message: string, type: ActivityLog['type'] = 'info') => {
    const time = new Date().toLocaleTimeString()
    setActivityLog(prev => [{time, message, type}, ...prev].slice(0, 10))
  }

  const handleRequestLoan = (merchant: DetectedMerchant) => {
    if (!keypair) return

    setSelectedMerchant(merchant)
    setCurrentStep(2)
    addLog('Generating proximity proof...', 'info')

    // Build message to sign
    const merchantPubkey = new PublicKey(merchant.merchantPubkey)
    const message = Buffer.concat([
      merchantPubkey.toBuffer(),
      keypair.publicKey.toBuffer(),
      Buffer.from([merchant.rssi & 0xFF]),
      Buffer.from(new BigUint64Array([BigInt(merchant.timestamp)]).buffer),
      Buffer.from(merchant.nonce, 'hex'),
    ])

    // Customer signs
    const customerSig = nacl.sign.detached(message, keypair.secretKey)
    addLog('✅ Ed25519 signature generated', 'success')

    // Simulate a brief delay for effect
    setTimeout(() => {
      setCurrentStep(3)
      addLog('Proximity proof validated', 'success')
      
      // Send loan request via WebSocket
      const socket = getSocket()
      const loanAmount = 2000000 // $2 USDC (6 decimals)
      
      socket.emit('loan:request', {
        customerPubkey: keypair.publicKey.toString(),
        merchantPubkey: merchant.merchantPubkey,
        amount: loanAmount,
        timestamp: Math.floor(Date.now() / 1000),
        rssi: merchant.rssi,
      })
      
      addLog('💳 Loan request sent to merchant', 'warning')
      addLog(`Requesting $${(loanAmount / 1000000).toFixed(2)} USDC`, 'info')
    }, 1500)
  }

  const getDistanceEstimate = (rssi: number) => {
    if (rssi > -50) return '1-3 meters (Very Close)'
    if (rssi > -60) return '3-5 meters (Close)'
    if (rssi > -70) return '5-10 meters (Nearby)'
    return '10+ meters (Far)'
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">👤 Customer Dashboard</h1>
          <p className="text-gray-600">Scan for nearby merchants and request nano-loans</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center ${currentStep >= 0 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${currentStep >= 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {currentStep > 0 ? '✓' : '1'}
              </div>
              <p className="text-sm font-semibold">Scan</p>
            </div>
            <div className={`flex-1 border-t-2 ${currentStep >= 1 ? 'border-blue-500' : 'border-gray-300'}`}></div>
            <div className={`flex-1 text-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {currentStep > 1 ? '✓' : '2'}
              </div>
              <p className="text-sm font-semibold">Select</p>
            </div>
            <div className={`flex-1 border-t-2 ${currentStep >= 2 ? 'border-blue-500' : 'border-gray-300'}`}></div>
            <div className={`flex-1 text-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {currentStep > 2 ? '✓' : '3'}
              </div>
              <p className="text-sm font-semibold">Verify</p>
            </div>
            <div className={`flex-1 border-t-2 ${currentStep >= 3 ? 'border-blue-500' : 'border-gray-300'}`}></div>
            <div className={`flex-1 text-center ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                {currentStep >= 3 ? '✓' : '4'}
              </div>
              <p className="text-sm font-semibold">Request</p>
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        {keypair && (
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Wallet</h2>
            <p className="text-sm font-mono opacity-90 break-all">
              {keypair.publicKey.toString()}
            </p>
          </div>
        )}

        {/* Scan Control */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">🔍 BLE Scanner</h2>
          
          {!isScanning ? (
            <button
              onClick={() => {
                setIsScanning(true)
                setCurrentStep(0)
                addLog('Started scanning for merchants...', 'info')
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition transform hover:scale-105"
            >
              Start Scanning 🔍
            </button>
          ) : (
            <div>
              <div className="flex items-center justify-center mb-4 p-4 bg-blue-50 rounded-lg">
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-700 font-bold text-lg ml-3">
                  SCANNING FOR MERCHANTS...
                </span>
              </div>
              <button
                onClick={() => {
                  setIsScanning(false)
                  addLog('Stopped scanning', 'info')
                }}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Stop Scanning
              </button>
            </div>
          )}
        </div>

        {/* Detected Merchants */}
        {merchants.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">🏪 Nearby Merchants ({merchants.length})</h2>
            <div className="space-y-3">
              {merchants.map((merchant, idx) => (
                <div
                  key={merchant.merchantPubkey}
                  className={`border-2 rounded-lg p-4 transition ${
                    selectedMerchant?.merchantPubkey === merchant.merchantPubkey
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                        #{idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-mono text-gray-700 font-semibold">
                          {merchant.merchantPubkey.substring(0, 20)}...
                        </p>
                        <p className="text-xs text-gray-500">
                          {getDistanceEstimate(merchant.rssi)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        merchant.rssi > -55 ? 'text-green-600' :
                        merchant.rssi > -65 ? 'text-yellow-600' :
                        'text-orange-600'
                      }`}>
                        {merchant.rssi} dBm
                      </div>
                      <div className="text-xs text-gray-500">Signal</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleRequestLoan(merchant)
                      setCurrentStep(1)
                    }}
                    disabled={currentStep >= 2}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
                  >
                    Request $2.00 Loan 💳
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Request Status */}
        {currentStep >= 2 && selectedMerchant && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentStep === 2 ? '🔐 Generating Proof...' : '✅ Loan Request Sent!'}
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-mono text-gray-800">{selectedMerchant.merchantPubkey.substring(0, 15)}...</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-mono text-gray-800 font-bold">$2.00 USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Distance:</span>
                <span className="font-mono text-gray-800">{getDistanceEstimate(selectedMerchant.rssi)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-semibold ${currentStep === 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {currentStep === 3 ? '✅ Awaiting Approval' : '⏳ Processing...'}
                </span>
              </div>
            </div>
            {currentStep === 3 && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  📤 Request sent to merchant! Waiting for approval...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Activity Log */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">📋 Activity Log</h2>
          {activityLog.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No activity yet...</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {activityLog.map((log, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded flex justify-between items-center ${
                    log.type === 'success' ? 'bg-green-50 text-green-800' :
                    log.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                    'bg-gray-50 text-gray-700'
                  }`}
                >
                  <span>{log.message}</span>
                  <span className="text-xs opacity-70">{log.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
