import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NanoCredit - BLE Proximity Loans',
  description: 'Fraud-resistant nano-lending on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

