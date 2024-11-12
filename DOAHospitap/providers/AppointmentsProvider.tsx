import React, { createContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://doah-backend.vercel.app/api/appointments';

// Define a type for the Appointment object
interface Appointment {
  userId: string;
  date: string; // in UTC format
  service: string;
  message: string;
  isDone: boolean;
  prescription: string[];
}

// Define the shape of the context value
interface AppointmentContextType {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
  appointmentList: Appointment[];
  setAppointmentList: React.Dispatch<React.SetStateAction<Appointment[]>>;
  fetchAllAppointments: () => Promise<void>;
  fetchAppointmentById: (id: string) => Promise<Appointment | null>;
  fetchAppointmentsByUserId: (id: string) => Promise<Appointment | null>;
  createAppointment: (newAppointment: Appointment) => Promise<void>;
  updateAppointment: (id: string, updatedData: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
}

// Create the default appointment context value
const defaultAppointmentContext: AppointmentContextType = {
  appointment: {
    userId: '',
    date: '',
    service: '',
    message: '',
    isDone: false,
    prescription: []
  },
  setAppointment: () => {}, // Placeholder function
  appointmentList: [],
  setAppointmentList: () => {},
  fetchAllAppointments: async () => {}, // Placeholder function
  fetchAppointmentById: async () => null,
  fetchAppointmentsByUserId: async () => null,
  createAppointment: async () => {},
  updateAppointment: async () => {},
  deleteAppointment: async () => {}
};

// Create the AppointmentContext with the default value
export const AppointmentContext = createContext<AppointmentContextType>(defaultAppointmentContext);

interface AppointmentProviderProps {
  children: ReactNode;
}

const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointment, setAppointment] = useState<Appointment>({
    userId: '',
    date: '',
    service: '',
    message: '',
    isDone: false,
    prescription: []
  });
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);

  // Fetch all appointments
  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get(`${API}/`);
      setAppointmentList(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Fetch an appointment by ID
  const fetchAppointmentById = async (id: string): Promise<Appointment | null> => {
    try {
      const response = await axios.get(`${API}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment with ID ${id}:`, error);
      return null;
    }
  };

  // Fetch an appointment by ID
  const fetchAppointmentsByUserId = async (id: string): Promise<Appointment | null> => {
    try {
      const response = await axios.get(`${API}`);
      const result = response.data.filter((appointment: Appointment) => appointment.userId === id)
      setAppointmentList(result)
      return result;
    } catch (error) {
      console.error(`Error fetching appointments with User ID ${id}:`, error);
      return null;
    }
  };


  // Create a new appointment
  const createAppointment = async (newAppointment: Appointment) => {
    const response = await axios.post(`${API}/`, newAppointment);
    console.log("Fetched ", response.data)
    setAppointment({
      userId: '',
      date: '',
      service: '',
      message: '',
      isDone: false,
      prescription: []
    })
    setAppointmentList([...appointmentList, newAppointment]); // Add new appointment to the list
  
  };

  // Update an existing appointment by ID
  const updateAppointment = async (id: string, updatedData: Partial<Appointment>) => {
    try {
      const response = await axios.patch(`${API}/${id}`, updatedData);
      setAppointmentList(appointmentList.map(appt => appt.userId === id ? response.data : appt)); // Update appointment in the list
    } catch (error) {
      console.error(`Error updating appointment with ID ${id}:`, error);
    }
  };

  // Delete an appointment by ID
  const deleteAppointment = async (id: string) => {
    try {
      await axios.delete(`${API}/${id}`);
      setAppointmentList(appointmentList.filter(appt => appt.userId !== id)); // Remove from list
    } catch (error) {
      console.error(`Error deleting appointment with ID ${id}:`, error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        setAppointment,
        appointmentList,
        setAppointmentList,
        fetchAllAppointments,
        fetchAppointmentById,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        fetchAppointmentsByUserId
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
