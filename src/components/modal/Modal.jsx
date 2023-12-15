import React, { useState, useContext } from 'react';
import { BookingContext } from '../../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import './Modal.css'; 

const Modal = ({ onClose }) => {
    const { selectedBooking } = useContext(BookingContext);
    const navigate = useNavigate(); 
    const [error, setError] = useState('');

    const getCourtObjectId = (courtNumber) => {
        const courtIds = {
            1: '65768b76da0ab5cec28c9f33', 
            2: '65768b76da0ab5cec28c9f34'
        };
        return courtIds[courtNumber] || null;
    };

    const handleBookingConfirmation = async () => {
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');


        if (!userId) {
            console.error("User ID is not set");
            setError("User not identified. Please log in again.");
            return;
        }

        const courtId = selectedBooking.courtNumber; 
        if (!courtId) {
            console.error("Court ID is not set");
            setError("Court not selected. Please select a court.");
            return;
        }

        const startTime = new Date(selectedBooking.date);
        const [hours, minutes] = selectedBooking.time.split(':').map(Number);
        startTime.setHours(hours, minutes, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1); 

        const startTimeISO = startTime.toISOString();
        const endTimeISO = endTime.toISOString();
        const dateISO = selectedBooking.date.toISOString();

        const courtObjectId = getCourtObjectId(selectedBooking.courtNumber);

        try {
            const requestBody = {
                userId: userId,
                courtId: courtObjectId, 
                date: dateISO,
                startTime: startTimeISO,
                endTime: endTimeISO
            };
            
            console.log('Sending booking request:', requestBody);
    
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });
    
            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Server responded with an error:', errorResponse);
                throw new Error('Failed to confirm booking. Please try again.');
            }

            const responseData = await response.json();
            console.log('Booking confirmed:', responseData);
            navigate('/booking-confirmation', { 
                state: { 
                    bookingDetails: responseData 
                }
            });

            onClose(); 
        } catch (error) {
            console.error('Error confirming booking:', error);
            setError(error.message);
        }
    };

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
