"use client";

import { useState, useEffect } from "react";
import { Keypair } from "@solana/web3.js";
import { getSocket } from "@/lib/socketClient";

export default function MerchantPage() {
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [nonce, setNonce] = useState<string>("");

  useEffect(() => {
    // Generate merchant keypair on mount
    const kp = Keypair.generate();
    setKeypair(kp);
  }, []);

  const startBroadcasting = () => {
    if (!keypair) return;

    const socket = getSocket();
    const timestamp = Math.floor(Date.now() / 1000);
    const nonceBytes = new Uint8Array(32);
    crypto.getRandomValues(nonceBytes);
    const nonceHex = Buffer.from(nonceBytes).toString("hex");

    setNonce(nonceHex.substring(0, 16) + "...");
    setIsBroadcasting(true);

    // Broadcast every 2 seconds
    const interval = setInterval(() => {
      socket.emit("merchant:broadcast", {
        merchantPubkey: keypair.publicKey.toString(),
        nonce: nonceHex,
        timestamp: Math.floor(Date.now() / 1000),
      });
    }, 2000);

    // Cleanup
    return () => clearInterval(interval);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">🏪 Merchant Dashboard</h1>

        {keypair && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-2">Your Wallet</h2>
            <p className="text-sm text-gray-600 font-mono break-all">
              {keypair.publicKey.toString()}
            </p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Broadcasting Status</h2>

          {!isBroadcasting ? (
            <button
              onClick={startBroadcasting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Start Broadcasting 📡
            </button>
          ) : (
            <div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-600 font-semibold">
                  Broadcasting...
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Nonce:</strong> {nonce}
                </p>
                <p>
                  <strong>Timestamp:</strong> {Math.floor(Date.now() / 1000)}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            📡 Waiting for customers...
          </h2>
          <p className="text-sm text-gray-600">Pending Loan Requests: 0</p>
        </div>
      </div>
    </main>
  );
}
