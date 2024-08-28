const messageController = require("../controllers/chat.controllers"); // Importa la instancia

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("joinChat", (user) => {
      onlineUsers.set(socket.id, user);
      io.emit("userList", Array.from(onlineUsers.values()));
    });

    socket.on("chatMessage", async (messageData) => {
      try {
        const message = await messageController.handleSocketMessage(messageData);
        io.emit("chatMessage", message);  // Emitir el mensaje a todos los clientes conectados
      } catch (error) {
        console.error("Error al enviar el mensaje: ", error);
      }
    });

    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      io.emit("userList", Array.from(onlineUsers.values()));
      console.log("Cliente desconectado");
    });
  });
};

module.exports = socketHandler;
