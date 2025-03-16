import mongoose from "mongoose"

export const Message = mongoose.model('messages',
    {
        userId: String,
        text: String,
        sender: String,
        date: { type: Date, default: Date.now }
    }
);