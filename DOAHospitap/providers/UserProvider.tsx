import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AppointmentContext } from './AppointmentsProvider';


const API = 'https://doah-backend.vercel.app/api/'

export const getAllUsers = async () => {
  const response = await fetch(`${API}user`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

export const getUserById = async (id: string) => {
  const response = await fetch(`${API}user/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch user with ID: ${id}`);
  return response.json();
};

export const getUserByEmailAndPassword = async (email: string, password: string) => {
  const response = await fetch(`${API}user/${email}/${password}`);
  if (!response.ok) throw new Error('Invalid email or password');
  return response.json();
};

export const createUser = async (user: User) => {
  const response = await fetch(`${API}user/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
  console.log("Sucesss")
  return response.json();
};

export const updateUser = async (id: string, updatedUser: User) => {
  const response = await fetch(`${API}user/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API}user/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
};

// Define a type for the user object
interface User {
  id: string;
  name: string;
  bday: string;
  gender: string;
  email: string;
  password: string;
}

// Define the shape of the context value
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (user: User) => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  updateUserDetails: (id: string, updatedUser: User) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
}

const defaultUserContext: UserContextType = {
  user: {
    id: '',
    name: '',
    bday: '',
    gender: '',
    email: '',
    password: ''
  },
  setUser: () => {},
  loginUser: async () => {},
  registerUser: async () => {},
  fetchUser: async () => {},
  updateUserDetails: async () => {},
  removeUser: async () => {}
};

// Create the UserContext with a default value
export const UserContext = createContext<UserContextType>(defaultUserContext);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    bday: '',
    gender: '',
    email: '',
    password: ''
  });

  const { fetchAppointmentsByUserId } = useContext(AppointmentContext)

  const loginUser = async (email: string, password: string) => {
    const loggedInUser = await getUserByEmailAndPassword(email, password);
    await fetchAppointmentsByUserId(loggedInUser._id)
    setUser({...loggedInUser, id: loggedInUser._id});
    
    console.log(loggedInUser)   
  };

  const registerUser = async (newUser: User) => {
    try {
      const createdUser = await createUser(newUser);
      setUser(createdUser);
    } catch (error) {
      console.error('User creation failed', error);
    }
  };

  const fetchUser = async (id: string) => {
    try {
      const fetchedUser = await getUserById(id);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  const updateUserDetails = async (id: string, updatedUser: User) => {
    try {
      const updatedUserData = await updateUser(id, updatedUser);
      setUser(updatedUserData);
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const removeUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUser({
        id: '',
        name: '',
        bday: '',
        gender: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loginUser,
        registerUser,
        fetchUser,
        updateUserDetails,
        removeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;