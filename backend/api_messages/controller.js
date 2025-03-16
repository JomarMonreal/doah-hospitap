import { Message } from '../models/messageModel.js'; 
// Get all messages
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages', error: err });
    }
};

// Get a message by ID
export const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching message by ID', error: err });
    }
};

// Create a new message
export const createMessage = async (req, res) => {
    try {
        const { userId, text, sender } = req.body;
        const newMessage = new Message({ userId, text, sender });
        await newMessage.save();
        res.status(201).json({ message: 'Message created successfully', messageData: newMessage });
    } catch (err) {
        res.status(500).json({ message: 'Error creating message', error: err });
    }
};

// Update a message by ID
export const updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message updated successfully', messageData: updatedMessage });
    } catch (err) {
        res.status(500).json({ message: 'Error updating message', error: err });
    }
};

// Delete a message by ID
export const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message', error: err });
    }
};

// Get messages by userId, ordered by latest date
export const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages by userId', error: err });
    }
};
