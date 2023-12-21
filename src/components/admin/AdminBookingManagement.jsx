import React, { useState, useEffect } from 'react';

const AdminBookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch bookings from the backend
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL/bookings) // Adjust the endpoint as needed
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    
};

export default AdminBookingManagement;
