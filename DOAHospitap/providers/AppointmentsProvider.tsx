import React, { createContext, ReactNode, useState } from 'react';

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
  setAppointmentList: () => {}
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
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([])

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        setAppointment,
        appointmentList,
        setAppointmentList
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentProvider;
