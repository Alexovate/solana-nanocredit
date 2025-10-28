import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🪙 NanoCredit
        </h1>
        <p className="text-center mb-8 text-gray-600">
          BLE Proximity-Verified Nano-Lending on Solana
        </p>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Link 
            href="/merchant"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">🏪 Merchant</h2>
            <p className="text-gray-600">Broadcast your store location</p>
          </Link>
          
          <Link 
            href="/customer"
            className="p-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">👤 Customer</h2>
            <p className="text-gray-600">Scan and request loans</p>
          </Link>
        </div>
      </div>
    </main>
  )
}

