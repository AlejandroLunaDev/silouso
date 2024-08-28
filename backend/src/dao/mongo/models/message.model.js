const { Schema, model } = require("mongoose");

const collection = "messages";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }  
});

const messageModel = model(collection, messageSchema);

module.exports = { messageModel };
