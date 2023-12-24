import React, { createContext, useState } from 'react';

// Creating a context for managing bookings
export const BookingContext = createContext();

// Provider component for the BookingContext
export const BookingProvider = ({ children }) => {
    // State for the currently selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    // State for storing bookings for court 1
    const [court1Bookings, setCourt1Bookings] = useState([]);

    // State for storing bookings for court 2
    const [court2Bookings, setCourt2Bookings] = useState([]);

    // State for the currently selected booking
    const [selectedBooking, setSelectedBooking] = useState(null);

    // The provider component wraps its children and provides them access to the BookingContext
    return (
        <BookingContext.Provider value={{
            selectedDate, 
            setSelectedDate, 
            court1Bookings, 
            setCourt1Bookings, 
            court2Bookings, 
            setCourt2Bookings, 
            selectedBooking, 
            setSelectedBooking
        }}>
            {children}
        </BookingContext.Provider>
    );
};
