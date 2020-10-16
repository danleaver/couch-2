const express = require('express');
const path = require('path');
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;

const app = express()
const server = http.createServer(app)
const io = socketIo(server); 

app.use(express.static(path.join(__dirname, 'build')));

server.listen(port, () => console.log(`Listening on port ${port}`));

let clients = 0
io.on("connection", (socket) => {
  clients++
  console.log(clients + "clients connected");
  socket.emit('newclientconnect', {description: "hey, welcome!"})
  socket.broadcast.emit('newclientconnect', {description: "someone new has joined!"})

  socket.on('stream', data =>{
    socket.broadcast.emit('stream', data)
  })

  socket.on('message', data => {
    console.log(data)
    socket.broadcast.emit('message', data)
  })

  socket.on("disconnect", () => {
    clients--
    console.log("client disconnected.." + clients + "clients remainining");
    socket.broadcast.emit('newclientconnect', {description: "someone has disconnected!"})
  });

});