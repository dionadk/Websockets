// Express
const express = require('express')
const app = express()

// Socket.io
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO.listen(server)
server.listen(3001)

// Schema & Model
const Schema = require('./db/schema.js')
const Message = Schema.Message

// Socket.io Connection
io.on('connection', (socket) => {
  Message.find({}).then(response => {
    const messages = response.map(message => message.body)
    io.emit('initial messages', messages)
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    Message.create({body: msg})
  })
})
