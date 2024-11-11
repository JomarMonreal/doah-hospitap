import express from 'express';
import { getAllUsers, getUserById, getUserByEmailAndPassword, createUser, updateUser, deleteUser } from './controller.js';

const userRouter = express.Router();

// Define your user-related routes
userRouter.get('/', getAllUsers); // Get all users
userRouter.get('/:id', getUserById); // Get user by ID
userRouter.get('/:email/:password', getUserByEmailAndPassword); // Get user by email and password
userRouter.post('/', createUser); // Create a new user
userRouter.patch('/:id', updateUser); // Update a user by ID
userRouter.delete('/:id', deleteUser); // Delete a user by ID

export default userRouter;
