import { Schema, model } from 'mongoose';

const collection = 'messages';

const messageSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const messageModel = model(collection, messageSchema);
