import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminBookingManagement.scss';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';





const AdminBookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [editableBookingId, setEditableBookingId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const convertToLocalTime = (utcDate) => {
        return moment(utcDate).local().format('DD-MM-YYYY HH:mm'); 
    };
    
    const extractTime = (dateTime) => {
        return moment(dateTime).format('HH:mm'); 
    };

    const calculateEndTime = (startDate) => {
        // Example: Adds 1 hour to the start date
        return new Date(startDate.getTime() + 60 * 60 * 1000);
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the stored token
    
        if (token) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the request headers
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
                // Handle error (e.g., show an error message)
            });
        } else {
            // Handle the case where the token is not available
        }
    }, []);

    const handleEditBooking = async (e, bookingId) => {
        e.preventDefault();

        // Construct the updatedData object
        const updatedData = {
            date: selectedDate.toISOString(),
            timeSlot: {
                start: selectedDate.toISOString(),
                end: calculateEndTime(selectedDate).toISOString()
            }
        };

        console.log("Sending updated data:", updatedData);

        const token = localStorage.getItem('token'); // Retrieve the stored token

        if (token) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the request headers
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) throw new Error('Network response was not ok.');

                const updatedBooking = await response.json(); // Get the updated booking data from the response

                // Update the bookings state with the updated booking
                setBookings(bookings.map(booking => 
                    booking._id === bookingId ? updatedBooking : booking
                ));

                setEditableBookingId(null); // Reset the editable booking ID
                // Optionally, show a success message
            } catch (error) {
                console.error('Error updating booking:', error);
                // Optionally, handle the error (e.g., show an error message)
            }
        } else {
            // Handle the case where the token is not available
        }
    };
    

    const onEditClick = (booking) => {
        setSelectedDate(new Date(booking.dateTime)); // Adjust according to your data structure
        setEditableBookingId(booking._id);
    };

    
    

    const handleDeleteBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            const token = localStorage.getItem('token'); // Retrieve the stored token
    
            if (token) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}` // Include the token in the request headers
                        }
                    });
    
                    if (!response.ok) throw new Error('Network response was not ok.');
    
                    setBookings(bookings.filter(booking => booking._id !== bookingId));
                    // Handle success (e.g., show a success message)
                } catch (error) {
                    console.error('Error deleting booking:', error);
                    // Handle error (e.g., show an error message)
                }
            } else {
                // Handle the case where the token is not available
            }
        }
    };

    

    return (
        <div className="admin-booking-management">
            <ToastContainer />
            {bookings.map(booking => (
                <div key={booking._id} className="booking-item">
                    {editableBookingId === booking._id ? (
                        // Edit form
                        <form onSubmit={(e) => handleEditBooking(e, booking._id)}>
                            <ReactDatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    console.log("Selected Date:", date);
                                }}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditableBookingId(null)}>Cancel</button>
                            <button onClick={() => onEditClick(booking)}>Edit</button>
                        </form>
                    ) : (
                        // Display booking details
                        <>
                            <div>Booking ID: {booking._id}</div>
                            <div>Username: {booking.username}</div>
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
