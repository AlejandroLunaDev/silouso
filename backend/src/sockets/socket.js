const messagesModel = require("../dao/mongo/models/message.model");
const productsModels = require("../dao/mongo/models/product.model");

module.exports = io => {
  io.on("connection", socket => {
    console.log(`Un cliente se ha conectado ${socket.id}`);
    socket.on("nuevoProducto", async producto => {
      try {
        await productsModels.create(producto);
        const productos = await productsModels.find().lean();
        io.emit("actualizarProductos", productos);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("eliminarProducto", async code => {
      try {
        await productsModels.deleteOne({ code: { $eq: code } });
        const productos = await productsModels.find().lean();
        io.emit("actualizarProductos", productos);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('newMessage', async (message) => {
      try {
        const savedMessage = await messagesModel.create(message);
        io.emit('updateMessages', savedMessage);
      } catch (error) {
        console.log(error);
        socket.emit('errorMessage', 'Hubo un error al guardar el mensaje.');
      }
    });

    socket.on("disconnect", () => {
      console.log("Un cliente se ha desconectado");
    });
  });
};
