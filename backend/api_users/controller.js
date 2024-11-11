import { userModel } from '../models/userModel.js'; // Adjust the import path according to your file structure

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user by ID', error: err });
    }
};

// Get user by email and password
export const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.params;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user by email and password', error: err });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, bday, gender, email, password } = req.body;
        const newUser = new userModel({ name, bday, gender, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
