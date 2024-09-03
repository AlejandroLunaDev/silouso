const Router = require('./router');
const MessageController = require('../controllerstemp/chat.controllers'); // Asegúrate de que la ruta sea correcta

class ChatRouter extends Router {
  init() {
    this.get(
      '/',
      ['USER', 'PREMIUM'],
      MessageController.getAllMessages.bind(MessageController)
    ); // Obtener todos los mensajes
    this.get(
      '/:userId',
      ['USER', 'PREMIUM'],
      MessageController.getUserMessages.bind(MessageController)
    ); // Obtener mensajes por ID de usuario
    this.post(
      '/',
      ['USER', 'PREMIUM'],
      MessageController.postMessage.bind(MessageController)
    ); // Crear un nuevo mensaje
  }
}

module.exports = new ChatRouter().getRouter();
