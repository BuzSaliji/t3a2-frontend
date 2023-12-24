import React, { createContext, useState } from 'react';

// Creating a context for user authentication and information
export const UserContext = createContext();

// Provider component for the UserContext
export const UserProvider = ({ children }) => {
    // State for the current user's information
    const [user, setUser] = useState(null);

    // State for the authentication token, initially fetched from local storage
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Function to handle user login
    const login = (newUser, newToken) => {
        // Setting the user's information and token in the state
        setUser(newUser);
        setToken(newToken);

        // Storing the token in local storage for persistence
        localStorage.setItem('token', newToken);
    };

    // Function to handle user logout
    const logout = () => {
        // Clearing the user's information and token from the state
        setUser(null);
        setToken(null);

        // Removing the token from local storage
        localStorage.removeItem('token');
    };

    // The provider component wraps its children and provides them access to the UserContext
    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
