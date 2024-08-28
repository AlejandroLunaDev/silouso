// common/socketConfig.js
const { Server } = require('socket.io');
const socketHandler = require('../utils/socketHandler');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "https://www.silouso.shop",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  // Manejar eventos de Socket.io
  socketHandler(io);

  return io;
};
