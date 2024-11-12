import React, { createContext, ReactNode, useState } from 'react';

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
}

// Create the UserContext with a default, non-null value
const defaultUserContext: UserContextType = {
    user: {
        id: '',
        name: '',
        bday: '',
        gender: '',
        email: '',
        password: ''
      }, 
    setUser: () => {}, // Placeholder function
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
