// /path/to/MessageController.js
const MessageDao = require('../dao/mongo/chat.mongo');

class MessageController {
  constructor() {
    this.messageDao = new MessageDao();
  }

  async postMessage(req, res) {
    try {
      const { sender, message: messageText, timestamp } = req.body;
      let { recipient } = req.body;

      if (!recipient) {
        recipient = null;
      }

      const existingMessage = await this.messageDao.findMessage({
        sender,
        message: messageText,
        timestamp,
      });

      if (existingMessage) {
        return res.status(200).json(existingMessage);
      }

      const messageData = { sender, message: messageText, timestamp };
      const newMessage = await this.messageDao.createMessage(messageData);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error in postMessage:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async handleSocketMessage(messageData) {
    try {
      const { sender, recipient, message: messageText, timestamp } = messageData;
      const existingMessage = await this.messageDao.findMessage({
        sender,
        message: messageText,
        timestamp,
      });

      if (existingMessage) {
        return existingMessage;
      }

      const newMessage = await this.messageDao.createMessage({
        sender,
        recipient,
        message: messageText,
        timestamp,
      });

      return newMessage;
    } catch (error) {
      console.error('Error in handleSocketMessage:', error);
      throw new Error('Error sending message: ' + error.message);
    }
  }

  async getAllMessages(req, res) {
    try {
      const messages = await this.messageDao.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error in getAllMessages:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserMessages(req, res) {
    try {
      const { userId } = req.params;
      const messages = await this.messageDao.getMessagesByUser(userId);
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error in getUserMessages:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

const messageController = new MessageController();
module.exports = messageController;
