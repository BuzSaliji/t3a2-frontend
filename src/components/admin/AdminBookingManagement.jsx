import React, { useState, useEffect } from 'react';

const AdminBookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings from the backend
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`) // Adjust the endpoint as needed
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleEditBooking = async (bookingId, updatedData) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) throw new Error('Network response was not ok.');
    
            const updatedBooking = await response.json();
            setBookings(bookings.map(booking => booking._id === bookingId ? updatedBooking : booking));
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Network response was not ok.');

            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div>
            {bookings.map(booking => (
                <div key={booking._id}>
                    {/* Display booking details */}
                    <button onClick={() => handleEditBooking(booking._id, {/* updatedData */})}>Edit</button>
                    <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};


    


export default AdminBookingManagement;
