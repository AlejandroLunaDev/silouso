const { messageModel } = require("./models/message.model");

class MessageDao {
  async createMessage(messageData) {
    try {
      const message = new messageModel(messageData);
      await message.save();
      return message;
    } catch (error) {
      console.error("Error in createMessage:", error);
      throw new Error("Error creating message: " + error.message);
    }
  }

  async getMessages() {
    try {
      return await messageModel.find();
    } catch (error) {
      console.error("Error in getMessages:", error);
      throw new Error("Error fetching messages: " + error.message);
    }
  }

  async getMessagesByUser(userId) {
    try {
      return await messageModel.find({
        $or: [{ sender: userId }, { recipient: userId }],
      }).populate("sender").populate("recipient");
    } catch (error) {
      console.error("Error in getMessagesByUser:", error);
      throw new Error("Error fetching user messages: " + error.message);
    }
  }

  async findMessage(query) {
    try {
      return await messageModel.findOne(query);
    } catch (error) {
      console.error("Error in findMessage:", error);
      throw new Error("Error finding message: " + error.message);
    }
  }
}

module.exports = MessageDao;
