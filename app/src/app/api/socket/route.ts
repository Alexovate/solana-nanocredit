import { Server } from 'socket.io'
import { NextResponse } from 'next/server'

// Store the io instance globally
let io: Server | null = null

export async function GET() {
  if (!io) {
    // @ts-ignore - accessing the global socket instance
    if (global.io) {
      // @ts-ignore
      io = global.io
    } else {
      return NextResponse.json({ error: 'Socket.IO not initialized' }, { status: 500 })
    }
  }

  return NextResponse.json({ status: 'ok' })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!io) {
      return NextResponse.json({ error: 'Socket.IO not initialized' }, { status: 500 })
    }

    // Broadcast merchant data to all connected clients
    if (body.type === 'merchant:broadcast') {
      io.emit('merchant:broadcast', body.data)
    }

    return NextResponse.json({ status: 'broadcasted' })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

