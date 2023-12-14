import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [court1Bookings, setCourt1Bookings] = useState([]);
    const [court2Bookings, setCourt2Bookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);


    return (
        <BookingContext.Provider value={{ selectedDate, setSelectedDate, court1Bookings, setCourt1Bookings, court2Bookings, setCourt2Bookings, selectedBooking, setSelectedBooking }}>
            {children}
        </BookingContext.Provider>
    );
};
