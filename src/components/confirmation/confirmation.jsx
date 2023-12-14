import React, { useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';

const BookingConfirmation = () => {
    const { selectedBooking } = useContext(BookingContext);

    if (!selectedBooking) {
        return <div>No booking information available.</div>;
    }

    // Example fields - adjust according to your actual data structure
    const { date, time, courtNumber, user } = selectedBooking;

    return (
        <div className="booking-confirmation">
            <h2>Booking Confirmation</h2>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Court Number:</strong> {courtNumber}</p>
            <p><strong>Username:</strong> {user.username}</p>
        </div>
    );
};

export default BookingConfirmation;