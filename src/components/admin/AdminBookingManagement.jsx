import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminBookingManagement.scss';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';

const AdminBookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [editableBookingId, setEditableBookingId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Converts UTC date to local time format
    const convertToLocalTime = (utcDate) => {
        return moment(utcDate).local().format('DD-MM-YYYY HH:mm'); 
    };
    
    // Extracts time from a dateTime string
    const extractTime = (dateTime) => {
        return moment(dateTime).format('HH:mm'); 
    };

    // Calculates the end time for a booking, assuming a fixed duration (e.g., 1 hour)
    const calculateEndTime = (startDate) => {
        return new Date(startDate.getTime() + 60 * 60 * 1000);
    };
    
    // Fetches all bookings on component mount
    useEffect(() => {
        const token = localStorage.getItem('token'); 
    
        if (token) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                return response.json();
            })
            .then(data => setBookings(data))
            .catch(error => {
                console.error('Error fetching bookings:', error);
                toast.error('Error fetching bookings');
            });
        } else {
            toast.error('No authentication token found');
        }
    }, []);

    // Handles the editing of a booking
    const handleEditBooking = async (e, bookingId) => {
        e.preventDefault();

        const updatedData = {
            date: selectedDate.toISOString(),
            timeSlot: {
                start: selectedDate.toISOString(),
                end: calculateEndTime(selectedDate).toISOString()
            }
        };

        const token = localStorage.getItem('token'); 

        if (token) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) throw new Error('Failed to update booking');

                const updatedBooking = await response.json(); 

                setBookings(bookings.map(booking => 
                    booking._id === bookingId ? updatedBooking : booking
                ));

                setEditableBookingId(null); 
                toast.success('Booking updated successfully');
            } catch (error) {
                console.error('Error updating booking:', error);
                toast.error('Error updating booking');
            }
        } else {
            toast.error('No authentication token found');
        }
    };

    // Prepares the form for editing a booking
    const onEditClick = (booking) => {
        setSelectedDate(new Date(booking.dateTime)); 
        setEditableBookingId(booking._id);
    };

    // Handles the deletion of a booking
    const handleDeleteBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            const token = localStorage.getItem('token'); 
    
            if (token) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
    
                    if (!response.ok) throw new Error('Failed to delete booking');
    
                    setBookings(bookings.filter(booking => booking._id !== bookingId));
                    toast.success('Booking deleted successfully');
                } catch (error) {
                    console.error('Error deleting booking:', error);
                    toast.error('Error deleting booking');
                }
            } else {
                toast.error('No authentication token found');
            }
        }
    };

    return (
        <div className="admin-booking-management">
            <ToastContainer />
            {bookings.map(booking => (
                <div key={booking._id} className="booking-item">
                    {/* Edit form for the selected booking */}
                    {editableBookingId === booking._id ? (
                        <form onSubmit={(e) => handleEditBooking(e, booking._id)}>
                            <ReactDatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditableBookingId(null)}>Cancel</button>
                            <button onClick={() => onEditClick(booking)}>Edit</button>
                        </form>
                    ) : (
                        // Display details of the booking
                        <>
                            <div>Booking ID: {booking._id}</div>
                            <div>Date: {convertToLocalTime(booking.date)}</div>
                            <div>Timeslot: {extractTime(booking.timeSlot.start)} - {extractTime(booking.timeSlot.end)}</div>
                            <button onClick={() => setEditableBookingId(booking._id)}>Edit</button>
                            <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};    
    
export default AdminBookingManagement;
