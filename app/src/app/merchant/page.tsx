"use client";

import { useState, useEffect } from "react";
import { Keypair } from "@solana/web3.js";
import { getSocket } from "@/lib/socketClient";

type LoanRequest = {
  customerPubkey: string;
  merchantPubkey: string;
  amount: number;
  timestamp: number;
  rssi: number;
};

type ActivityLog = {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning';
};

export default function MerchantPage() {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [nonce, setNonce] = useState<string>("");
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [connectedCustomers, setConnectedCustomers] = useState(0);

  useEffect(() => {
    const kp = Keypair.generate();
    setKeypair(kp);
    addLog('Merchant wallet generated', 'success');
  }, []);

  // Listen for loan requests
  useEffect(() => {
    if (!keypair) return;

    const socket = getSocket();

    socket.on('loan:request', (data: LoanRequest) => {
      // Only show requests for this merchant
      if (data.merchantPubkey === keypair.publicKey.toString()) {
        console.log('📥 Received loan request:', data);
        setLoanRequests(prev => [...prev, data]);
        setConnectedCustomers(prev => prev + 1);
        addLog(`Loan request received: $${(data.amount / 1000000).toFixed(2)} from ${data.customerPubkey.substring(0, 8)}...`, 'warning');
      }
    });

    return () => {
      socket.off('loan:request');
    };
  }, [keypair]);

  const addLog = (message: string, type: ActivityLog['type'] = 'info') => {
    const time = new Date().toLocaleTimeString();
    setActivityLog(prev => [{time, message, type}, ...prev].slice(0, 10));
  };

  const startBroadcasting = () => {
    if (!keypair) return;

    const socket = getSocket();
    const nonceBytes = new Uint8Array(32);
    crypto.getRandomValues(nonceBytes);
    const nonceHex = Buffer.from(nonceBytes).toString("hex");

    setNonce(nonceHex.substring(0, 16) + "...");
    setIsBroadcasting(true);
    addLog('Started broadcasting store location', 'success');

    // Update timestamp every second for UI
    const timestampInterval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    // Broadcast every 2 seconds
    const broadcastInterval = setInterval(() => {
      socket.emit("merchant:broadcast", {
        merchantPubkey: keypair.publicKey.toString(),
        nonce: nonceHex,
        timestamp: Math.floor(Date.now() / 1000),
      });
    }, 2000);

    // Cleanup
    return () => {
      clearInterval(broadcastInterval);
      clearInterval(timestampInterval);
    };
  };

  const approveLoan = (request: LoanRequest) => {
    addLog(`Approved loan for ${request.customerPubkey.substring(0, 8)}...`, 'success');
    setLoanRequests(prev => prev.filter(r => r.customerPubkey !== request.customerPubkey));
  };

  const rejectLoan = (request: LoanRequest) => {
    addLog(`Rejected loan for ${request.customerPubkey.substring(0, 8)}...`, 'info');
    setLoanRequests(prev => prev.filter(r => r.customerPubkey !== request.customerPubkey));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🏪 Merchant Dashboard</h1>
          <p className="text-gray-600">Broadcast your location and manage loan requests</p>
        </div>

        {/* Wallet Info */}
        {keypair && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Store Wallet</h2>
            <p className="text-sm font-mono opacity-90 break-all">
              {keypair.publicKey.toString()}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Broadcasting Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              📡 BLE Broadcasting
            </h2>

            {!isBroadcasting ? (
              <button
                onClick={startBroadcasting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition transform hover:scale-105"
              >
                Start Broadcasting 📡
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-center mb-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-green-700 font-bold text-lg">
                    BROADCASTING
                  </span>
                </div>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nonce:</span>
                    <span className="font-mono text-gray-800">{nonce}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timestamp:</span>
                    <span className="font-mono text-gray-800">{currentTimestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interval:</span>
                    <span className="font-mono text-gray-800">2 seconds</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📊 Live Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Nearby Customers</span>
                <span className="text-2xl font-bold text-blue-600">{connectedCustomers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-gray-700">Pending Requests</span>
                <span className="text-2xl font-bold text-yellow-600">{loanRequests.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">Status</span>
                <span className={`font-semibold ${isBroadcasting ? 'text-green-600' : 'text-gray-400'}`}>
                  {isBroadcasting ? '🟢 Active' : '⚫ Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Requests */}
        {loanRequests.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              💰 Loan Requests ({loanRequests.length})
            </h2>
            <div className="space-y-3">
              {loanRequests.map((request, idx) => (
                <div
                  key={idx}
                  className="border-2 border-yellow-300 bg-yellow-50 rounded-lg p-4 animate-pulse-once"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-mono text-gray-700 mb-1">
                        <strong>Customer:</strong> {request.customerPubkey.substring(0, 25)}...
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Amount:</strong> ${(request.amount / 1000000).toFixed(2)} USDC
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Distance:</strong> ~{Math.abs(request.rssi) < 50 ? '2-5' : '5-10'} meters ({request.rssi} dBm)
                      </p>
                    </div>
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                      PENDING
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => approveLoan(request)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => rejectLoan(request)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
  );
}
