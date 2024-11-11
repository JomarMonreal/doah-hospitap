import { Appointment } from '../models/appointment.js'; // Adjust import path according to your file structure

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments', error: err });
    }
};

// Get an appointment by ID
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointment by ID', error: err });
    }
};

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const { userId, date, service, message, isDone, prescription } = req.body;
        const newAppointment = new Appointment({ userId, date, service, message, isDone, prescription });
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (err) {
        res.status(500).json({ message: 'Error creating appointment', error: err });
    }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (err) {
        res.status(500).json({ message: 'Error updating appointment', error: err });
    }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting appointment', error: err });
    }
};
