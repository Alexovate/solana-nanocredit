const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id)

    // Handle merchant broadcasting
    socket.on('merchant:broadcast', (data) => {
      console.log('📡 Broadcasting merchant data:', data.merchantPubkey)
      // Add simulated RSSI (signal strength) between -45 and -75 dBm
      const rssi = -45 - Math.floor(Math.random() * 30)
      // Broadcast to all other clients as 'merchant:detected' for customers
      socket.broadcast.emit('merchant:detected', {
        ...data,
        rssi: rssi
      })
    })

    // Handle loan requests from customers
    socket.on('loan:request', (data) => {
      console.log('💰 Loan request:', data.customerPubkey, '→', data.merchantPubkey)
      // Send to all clients (merchant will filter by their pubkey)
      io.emit('loan:request', data)
    })

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id)
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`✅ Server ready on http://${hostname}:${port}`)
      console.log(`✅ Socket.IO ready`)
    })
})

