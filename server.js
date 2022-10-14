const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes.js')
const helmet = require('helmet')
const http = require('http')
const { Server } = require("socket.io")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const clientOrigin = "http://localhost:3000"

// middleware
app.use(cors())
app.use(express.json({ limit: "50mb" }))


app.use("/api/v1/", routes)
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" })
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })
})


module.exports = server
