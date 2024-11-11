import express from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from './controller.js';

const appointmentRouter = express.Router();

// Define your appointment-related routes
appointmentRouter.get('/', getAllAppointments); // Get all appointments
appointmentRouter.get('/:id', getAppointmentById); // Get appointment by ID
appointmentRouter.post('/', createAppointment); // Create a new appointment
appointmentRouter.patch('/:id', updateAppointment); // Update an appointment by ID
appointmentRouter.delete('/:id', deleteAppointment); // Delete an appointment by ID

export default appointmentRouter;
