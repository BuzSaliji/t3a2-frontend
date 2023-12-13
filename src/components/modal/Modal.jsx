import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css'; 

const Modal = ({ selectedBooking, onClose }) => {
    const navigate = useNavigate(); 

    const handleBookingConfirmation = () => {
        // Here you can add logic to send booking data to backend
        // For now, let's navigate to a confirmation page
        navigate('/booking-confirmation', { 
            state: { 
                date: selectedBooking.date, 
                time: selectedBooking.time, 
                courtNumber: selectedBooking.courtNumber 
            }
        });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Confirm Your Booking</h2>
                <p>Court {selectedBooking.courtNumber} at {selectedBooking.time}</p>
                <button onClick={handleBookingConfirmation}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default Modal;
