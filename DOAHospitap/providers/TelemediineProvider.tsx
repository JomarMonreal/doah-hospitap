import React, { createContext, ReactNode, useState } from 'react';

// Define a type for the Telemedicine object
interface Telemedicine {
  medicine: string;
  hours: number;
  duration: string; // UTC date format
}

// Define the shape of the context value
interface TelemedicineContextType {
  telemedicineList: Telemedicine[];
  setTelemedicineList: React.Dispatch<React.SetStateAction<Telemedicine[]>>;
  currentTelemedicine: Telemedicine;
  setCurrentTelemedicine: React.Dispatch<React.SetStateAction<Telemedicine>>;
}

// Create the TelemedicineContext with a default, non-null value
const defaultTelemedicineContext: TelemedicineContextType = {
  telemedicineList: [],
  setTelemedicineList: () => {}, // Placeholder function
  currentTelemedicine: {
    medicine: '',
    hours: 0,
    duration: ''
  },
  setCurrentTelemedicine: () => {}, // Placeholder function
};

// Create the TelemedicineContext with a default value
export const TelemedicineContext = createContext<TelemedicineContextType>(defaultTelemedicineContext);

interface TelemedicineProviderProps {
  children: ReactNode;
}

const TelemedicineProvider: React.FC<TelemedicineProviderProps> = ({ children }) => {
  const [telemedicineList, setTelemedicineList] = useState<Telemedicine[]>([]);
  const [currentTelemedicine, setCurrentTelemedicine] = useState<Telemedicine>({
    medicine: '',
    hours: 0,
    duration: ''
  });

  return (
    <TelemedicineContext.Provider
      value={{
        telemedicineList,
        setTelemedicineList,
        currentTelemedicine,
        setCurrentTelemedicine,
      }}
    >
      {children}
    </TelemedicineContext.Provider>
  );
};

export default TelemedicineProvider;
