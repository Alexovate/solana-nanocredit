import { Server as HTTPServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { Socket } from 'socket.io'

export type MerchantBroadcast = {
  merchantPubkey: string
  nonce: string
  timestamp: number
}

let io: SocketServer | undefined

export function initSocketServer(httpServer: HTTPServer) {
  if (io) return io

  io = new SocketServer(httpServer, {
    path: '/api/socket',
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id)

    // Merchant broadcasts their presence
    socket.on('merchant:broadcast', (data: MerchantBroadcast) => {
      console.log('Merchant broadcasting:', data.merchantPubkey)
      socket.broadcast.emit('merchant:detected', {
        ...data,
        rssi: -65, // Mock RSSI value (~5 meters)
      })
    })

    // Customer requests proximity proof signing
    socket.on('customer:request-signature', (data: any) => {
      console.log('Customer requesting signature for merchant:', data.merchantPubkey)
      // Broadcast to the specific merchant
      socket.broadcast.emit('merchant:sign-request', data)
    })

    // Merchant responds with signature
    socket.on('merchant:signature-response', (data: any) => {
      console.log('Merchant signature received')
      socket.broadcast.emit('customer:signature-received', data)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })

  return io
}

export function getSocketServer() {
  if (!io) {
    throw new Error('Socket server not initialized')
  }
  return io
}

