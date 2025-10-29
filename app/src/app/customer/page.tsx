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

type ProximityProof = {
  merchant: string
  customer: string
  rssi: number
  timestamp: number
  nonce: Uint8Array
  customerSignature: Uint8Array
  merchantSignature: Uint8Array
}

export default function CustomerPage() {
  const [keypair, setKeypair] = useState<Keypair | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [merchants, setMerchants] = useState<DetectedMerchant[]>([])
  const [selectedMerchant, setSelectedMerchant] = useState<DetectedMerchant | null>(null)
  const [proximityProof, setProximityProof] = useState<ProximityProof | null>(null)

  useEffect(() => {
    const kp = Keypair.generate()
    setKeypair(kp)
  }, [])

  useEffect(() => {
    if (!isScanning) return

    const socket = getSocket()

    socket.on('merchant:detected', (data: DetectedMerchant) => {
      console.log('Merchant detected:', data)
      setMerchants(prev => {
        const existing = prev.find(m => m.merchantPubkey === data.merchantPubkey)
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

  const generateProximityProof = (merchant: DetectedMerchant) => {
    if (!keypair) return

    setSelectedMerchant(merchant)

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

    // Mock merchant signature (in real scenario, merchant would sign via WebSocket)
    const mockMerchantSig = new Uint8Array(64).fill(3)

    const proof: ProximityProof = {
      merchant: merchant.merchantPubkey,
      customer: keypair.publicKey.toString(),
      rssi: merchant.rssi,
      timestamp: merchant.timestamp,
      nonce: Buffer.from(merchant.nonce, 'hex'),
      customerSignature: customerSig,
      merchantSignature: mockMerchantSig,
    }

    setProximityProof(proof)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">👤 Customer Dashboard</h1>

        {keypair && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-2">Your Wallet</h2>
            <p className="text-sm text-gray-600 font-mono break-all">
              {keypair.publicKey.toString()}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Scan for Merchants</h2>
          
          {!isScanning ? (
            <button
              onClick={() => setIsScanning(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Start Scanning 🔍
            </button>
          ) : (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-blue-600 font-semibold">Scanning...</span>
              </div>
              <button
                onClick={() => setIsScanning(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Stop Scanning
              </button>
            </div>
          )}
        </div>

        {merchants.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Nearby Merchants ({merchants.length})</h2>
            <div className="space-y-3">
              {merchants.map((merchant) => (
                <div
                  key={merchant.merchantPubkey}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-mono text-gray-700">
                      {merchant.merchantPubkey.substring(0, 20)}...
                    </p>
                    <span className="text-sm text-blue-600 font-semibold">
                      {merchant.rssi} dBm
                    </span>
                  </div>
                  <button
                    onClick={() => generateProximityProof(merchant)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition"
                  >
                    Request Loan 💳
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {proximityProof && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">✅ Proximity Proof Generated</h2>
            <div className="bg-gray-50 p-4 rounded text-sm font-mono overflow-x-auto">
              <p className="mb-2"><strong>Merchant:</strong> {proximityProof.merchant.substring(0, 30)}...</p>
              <p className="mb-2"><strong>Customer:</strong> {proximityProof.customer.substring(0, 30)}...</p>
              <p className="mb-2"><strong>RSSI:</strong> {proximityProof.rssi} dBm (~5 meters)</p>
              <p className="mb-2"><strong>Timestamp:</strong> {proximityProof.timestamp}</p>
              <p className="mb-2"><strong>Nonce:</strong> {Buffer.from(proximityProof.nonce).toString('hex').substring(0, 32)}...</p>
              <p className="mb-2"><strong>Customer Sig:</strong> {Buffer.from(proximityProof.customerSignature).toString('hex').substring(0, 32)}...</p>
              <p><strong>Merchant Sig:</strong> {Buffer.from(proximityProof.merchantSignature).toString('hex').substring(0, 32)}...</p>
            </div>
            <button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Submit to Solana 🚀
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

