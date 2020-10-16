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

io.on("connection", (socket) => {
  console.log("connection has been made")
});