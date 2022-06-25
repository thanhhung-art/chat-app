import express from 'express'
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

const app = express();
app.use(cors())

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET','POST']
  }
})

io.on('connection', (socket: Socket) => {
  console.log(`user ${socket.id} connected`)

  socket.on('join_room', (roomID) => {
    socket.join(roomID)
  })

  socket.on('send_message', (data: User) => {
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} have disconnected`)
  })

})


httpServer.listen(5000, () => {
  console.log("server is running at port 5000")
})