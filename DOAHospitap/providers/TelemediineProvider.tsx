import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // Fetch the telemedicineList from AsyncStorage on component mount
  useEffect(() => {
    const fetchTelemedicineList = async () => {
      try {
        const storedData = await AsyncStorage.getItem('telemedicineList');
        if (storedData) {
          setTelemedicineList(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Failed to fetch telemedicineList from storage:', error);
      }
    };

    fetchTelemedicineList();
  }, []);

  // Save telemedicineList to AsyncStorage whenever it updates
  useEffect(() => {
    const saveTelemedicineList = async () => {
      try {
        await AsyncStorage.setItem('telemedicineList', JSON.stringify(telemedicineList));
      } catch (error) {
        console.error('Failed to save telemedicineList to storage:', error);
      }
    };

    if (telemedicineList.length > 0) {
      saveTelemedicineList();
    }
  }, [telemedicineList]);

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
