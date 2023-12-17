import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import racquetAndBall from '../../assets/images/racquetandball.jpg';

import './Confirmation.css';

const Confirmation = () => {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const { bookingId } = useParams(); // Assuming you're using URL params

    useEffect(() => {
        const fetchBookingDetails = async () => {
            const token = localStorage.getItem('token');
        
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();
                setBookingDetails(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleBookAgain = () => {
        navigate('/calendar');
    };

    if (!bookingDetails) {
        return <div>Loading booking details...</div>;
    }

    const formattedDate = new Date(bookingDetails.date).toLocaleDateString();
    const formattedTime = `${new Date(bookingDetails.timeSlot.start).toLocaleTimeString()} - ${new Date(bookingDetails.timeSlot.end).toLocaleTimeString()}`;

    
    return (
        <div className="booking-confirmation-page">
            <div className="booking-confirmation">
                <h2>Booking Confirmed!</h2>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p><strong>Court Name:</strong> {bookingDetails.court.name}</p>
                <p><strong>Username:</strong> {bookingDetails.user.username}</p>
                <button onClick={handleBookAgain}>Book Again</button>
            </div>

            <div className="image-container">
                <img src={racquetAndBall} alt="racquet and ball" />

            </div>
        </div>
    );
};

export default Confirmation;
