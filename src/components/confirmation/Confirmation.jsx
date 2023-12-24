import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import whiteLogo from '../../assets/images/White logo - no background.png';
import './Confirmation.scss';

const Confirmation = () => {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const { bookingId } = useParams(); // Extracting bookingId from URL parameters

    // Fetch booking details on component mount or when bookingId changes
    useEffect(() => {
        const fetchBookingDetails = async () => {
            const token = localStorage.getItem('token');
        
            try {
                // Fetching booking details from the backend
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/${bookingId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Authorization header with token
                    }
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();
                setBookingDetails(data); // Setting the fetched booking details to state
            } catch (err) {
                setError(err.message); // Setting error message in case of failure
            }
        };

        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);

    // Display error message if there is an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Navigate to calendar for new booking
    const handleBookAgain = () => {
        navigate('/calendar');
    };

    // Display loading message while booking details are being fetched
    if (!bookingDetails) {
        return <div>Loading booking details...</div>;
    }

    // Formatting date and time for display
    const formattedDate = new Date(bookingDetails.date).toLocaleDateString();
    const formattedTime = `${new Date(bookingDetails.timeSlot.start).toLocaleTimeString()} - ${new Date(bookingDetails.timeSlot.end).toLocaleTimeString()}`;

    // Rendering the confirmation page with booking details
    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <h2>Booking Confirmed!</h2>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p><strong>Court Name:</strong> {bookingDetails.court.name}</p>
                <p><strong>Username:</strong> {bookingDetails.user.username}</p>
                <button onClick={handleBookAgain}>Book Again</button>
            </div>
            <div className="logo-container">
                <img src={whiteLogo} alt="Court Connect Logo" />
            </div>
        </div>
    );
};

export default Confirmation;
