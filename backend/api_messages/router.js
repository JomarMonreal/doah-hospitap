import express from 'express';
import { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage, getMessagesByUserId } from './controller.js';

const messageRouter = express.Router();

// Define your message-related routes
messageRouter.get('/', getAllMessages); // Get all messages
messageRouter.get('/:id', getMessageById); // Get a message by ID
messageRouter.post('/', createMessage); // Create a new message
messageRouter.patch('/:id', updateMessage); // Update a message by ID
messageRouter.delete('/:id', deleteMessage); // Delete a message by ID
messageRouter.get('/user/:userId', getMessagesByUserId); // Get messages by userId, ordered by latest

export default messageRouter;
