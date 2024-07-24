import { messageModel } from "../../dao/models/messageModel.js";
import dotenv from "dotenv";

dotenv.config();

export default (io) => {
  io.on("connection", async (socket) => {
    console.log(`Se ha conectado un cliente con el id ${socket.id}`);

    try {
      const allMessages = await messageModel.find().sort({ createdAt: -1 });
      const messageLimit = parseInt(process.env.MESSAGE_LIMIT);
      const lastTwoMessages = allMessages.slice(0, messageLimit || 10);
      socket.emit("previousMessages", lastTwoMessages.reverse());
    } catch (err) {
      console.error("Error al obtener los mensajes:", err.message);
    }

    socket.on("disconnect", () => {
      console.log("Se ha desconectado un cliente");
    });

    socket.on("message", async (data) => {
      try {
        const nuevoMensaje = new messageModel({
          user: data.userName,
          message: data.message,
        });
        const savedMessage = await nuevoMensaje.save();
        console.log("Mensaje guardado en la base de datos:", savedMessage);
      } catch (err) {
        console.error(
          "Error al guardar el mensaje en la base de datos:",
          err.message
        );
      }

      io.emit("message", { userName: data.userName, message: data.message });
    });

    socket.on("addProduct", (productData) => {
      console.log("Nuevo producto recibido desde el cliente:", productData);
      io.emit("newProduct", productData);
    });
  });
};
