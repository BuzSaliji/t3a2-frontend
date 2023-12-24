import React, { useState, useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import './Modal.scss'; 

const Modal = ({ onClose }) => {
    // Accessing selectedBooking from BookingContext
    const { selectedBooking } = useContext(BookingContext);

    // Hook to programmatically navigate to other routes
    const navigate = useNavigate(); 

    // State for handling error messages
    const [error, setError] = useState('');

    // Function to get the court object ID based on the court number
    const getCourtObjectId = (courtNumber) => {
        const courtIds = {
            1: '65768b76da0ab5cec28c9f33', 
            2: '65768b76da0ab5cec28c9f34'
        };
        return courtIds[courtNumber] || null;
    };

    // Function to handle booking confirmation
    const handleBookingConfirmation = async () => {
        // Retrieving token and user ID from local storage
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');

        // Error handling for missing user ID
        if (!userId) {
            console.error("User ID is not set");
            setError("User not identified. Please log in again.");
            return;
        }

        // Error handling for missing court ID
        const courtId = selectedBooking.courtNumber; 
        if (!courtId) {
            console.error("Court ID is not set");
            setError("Court not selected. Please select a court.");
            return;
        }

        // Setting up start and end times for the booking
        const startTime = new Date(selectedBooking.date);
        const [hours, minutes] = selectedBooking.time.split(':').map(Number);
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1); 

        // Formatting times for the booking request
        const startTimeISO = startTime.toISOString();
        const endTimeISO = endTime.toISOString();
        const dateISO = selectedBooking.date.toISOString();

        // Getting the court object ID
        const courtObjectId = getCourtObjectId(selectedBooking.courtNumber);

        try {
            // Preparing the booking request body
            const requestBody = {
                userId: userId,
                courtId: courtObjectId, 
                date: dateISO,
                startTime: startTimeISO,
                endTime: endTimeISO
            };
            
            console.log('Sending booking request:', requestBody);
    
            // Making a POST request to create a booking
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
    
            // Handling non-OK responses
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server responded with an error:', errorResponse);
                throw new Error('Failed to confirm booking. Please try again.');
            }

            // Parsing the response data
            const responseData = await response.json();
            console.log('Booking confirmed:', responseData);

            // Navigating to the confirmation page with booking details
            navigate(`/confirmation/${responseData._id}`, { 
                state: { 
                    bookingDetails: responseData 
                }
            });

            // Closing the modal
            onClose(); 
        } catch (error) {
            console.error('Error confirming booking:', error);
            setError(error.message);
        }
    };

    // Rendering the modal
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Confirm Your Booking</h2>
                {selectedBooking && (
                    <p>Court {selectedBooking.courtNumber} at {selectedBooking.time}</p>
                )}
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleBookingConfirmation}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default Modal;
