import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component that will wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info in state

  // Function to log in a user
  const login = (userData) => {
    setUser(userData); // Update user state with the provided data
  };

  // Function to log out a user
  const logout = () => {
    setUser(null); // Clear user state
  };

  // Provide the context to the component tree
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
