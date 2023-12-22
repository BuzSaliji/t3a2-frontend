import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminBookingManagement.scss';

const AdminBookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`)
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => {
                console.error('Error fetching bookings:', error);
                toast.error('Error fetching bookings.');
            });
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
            toast.success("Booking updated successfully!");
        } catch (error) {
            console.error('Error updating booking:', error);
            toast.error("Error updating booking.");
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Network response was not ok.');

                setBookings(bookings.filter(booking => booking._id !== bookingId));
                toast.success("Booking deleted successfully!");
            } catch (error) {
                console.error('Error deleting booking:', error);
                toast.error("Error deleting booking.");
            }
        }
    };

    return (
        <div className="admin-booking-management">
            <ToastContainer />
            {bookings.map(booking => (
                <div key={booking._id} className="booking-item">
                    {/* Display booking details */}
                    <button onClick={() => handleEditBooking(booking._id, {/* updatedData */})}>Edit</button>
                    <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminBookingManagement;
