// common/socketConfig.js
const { Server } = require('socket.io');
const socketHandler = require('../utils/socketHandler');

module.exports = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "https://www.silouso.shop",  // URL de producción
        "http://localhost:5173"       // URL del frontend local
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });

  console.log("Socket.io initialized"); // Verifica que se inicializa

  socketHandler(io);

  return io;
};
