import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css'; 

const Modal = ({ selectedBooking, onClose }) => {
    const navigate = useNavigate(); 
    const [error, setError] = useState('');

    const handleBookingConfirmation = async () => {
        const token = localStorage.getItem('token'); 
        const userId = localStorage.getItem('userId');
        const courtId = selectedBooking.courtNumber; 
    
        const startTime = new Date(selectedBooking.date);
        const [hours, minutes] = selectedBooking.time.split(':').map(Number);
        startTime.setHours(hours, minutes, 0, 0);
    
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1); // Assuming 1 hour duration
    
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    courtId: courtId,
                    date: selectedBooking.date,
                    timeSlot: {
                        start: startTime,
                        end: endTime
                    }
                })
            });
    
            if (!response.ok) {
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
                <p>Court {selectedBooking.courtNumber} at {selectedBooking.time}</p>
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleBookingConfirmation}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default Modal;