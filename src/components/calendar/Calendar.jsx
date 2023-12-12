import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment-timezone';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; 

// Assume 'utcTime' is the time fetched from your server in UTC
const utcTime = '2023-12-12T09:00:00Z'; // Example UTC time

// Convert UTC time to local time
const localTime = moment(utcTime).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss');

console.log(localTime); // This will display the time in the user's local time zone


function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [court1Bookings, setCourt1Bookings] = useState([]);
    const [court2Bookings, setCourt2Bookings] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [selectedCourt, setSelectedCourt] = useState(null);

    useEffect(() => {
        fetchBookings(selectedDate);
    }, [selectedDate]);

    const onChange = (newDate) => {
        setSelectedDate(newDate);
        fetchBookings(newDate);
    };

    const fetchBookings = async (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const court1Id = '65768b76da0ab5cec28c9f33'; 
        const court2Id = '65768b76da0ab5cec28c9f34'; 
        const token = localStorage.getItem('token');
        console.log("Token: ", token);
    
        try {
            // Fetch bookings for Court 1
            const responseCourt1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/by-court?courtId=${court1Id}&startDate=${formattedDate}&endDate=${formattedDate}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!responseCourt1.ok) {
                throw new Error('Failed to fetch bookings for Court 1');
            }
            const dataCourt1 = await responseCourt1.json();
            console.log("Court 1 Bookings:", dataCourt1);
            setCourt1Bookings(dataCourt1);
    
            // Fetch bookings for Court 2
            const responseCourt2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/by-court?courtId=${court2Id}&startDate=${formattedDate}&endDate=${formattedDate}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!responseCourt2.ok) {
                throw new Error('Failed to fetch bookings for Court 2');
            }
            const dataCourt2 = await responseCourt2.json();
            console.log("Court 2 Bookings:", dataCourt2);
            setCourt2Bookings(dataCourt2);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    

    const calculateAvailableTimeSlots = (bookings) => {
        const operatingHours = { start: 9, end: 20 }; 
        const timeSlots = [];
    
        for (let hour = operatingHours.start; hour < operatingHours.end; hour++) {
            const slotStart = new Date(selectedDate);
            slotStart.setHours(hour, 0, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setHours(hour + 1, 0, 0, 0);
    
            // console.log(`Slot Start: ${slotStart}, Slot End: ${slotEnd}`); 
    
            const isAvailable = !bookings.some(booking => {
                const bookingStart = new Date(booking.timeSlot.start);
                const bookingEnd = new Date(booking.timeSlot.end);
                
                // console.log(`Booking Start: ${bookingStart}, Booking End: ${bookingEnd}`);
    
                if (slotStart < bookingEnd && slotEnd > bookingStart) {
                    console.log('This slot should be marked as unavailable'); 
                    return true;
                }
                return false;
            });
    
            timeSlots.push({ time: `${hour.toString().padStart(2, '0')}:00`, available: isAvailable });
        }
    
        return timeSlots;
    };
    

    const handleTimeSlotSelection = (slot, courtNumber) => {
        console.log(`Selected time slot for Court ${courtNumber}:`, slot);
        setSelectedTimeSlot(slot);
        setSelectedCourt(courtNumber);

        // Modal to proceed to booking page
    };

    const court1TimeSlots = calculateAvailableTimeSlots(court1Bookings);
    const court2TimeSlots = calculateAvailableTimeSlots(court2Bookings);

    return (
        <div className="main-container">
            <div className="calendar-container">
                <Calendar onChange={onChange} value={selectedDate} />
            </div>
    
            <div className="court-time-slots-container">
                <div className="court-container">
                    <h3>Court 1</h3>
                    <div className="time-slots">
                    {court1TimeSlots.map((slot, index) => {
                        // console.log(`Rendering Court 1 Slot: ${slot.time}, Available: ${slot.available}`);
                        return (
                            <button 
                                key={index} 
                                onClick={() => slot.available && handleTimeSlotSelection(slot.time, 1)}
                                className={slot.available ? "" : "unavailable-slot"}
                            >
                                {slot.time}
                            </button>
                        );
                    })}
                    </div>
                </div>
    
                <div className="court-container">
                    <h3>Court 2</h3>
                    <div className="time-slots">
                    {court2TimeSlots.map((slot, index) => {
                        // console.log(`Rendering Court 2 Slot: ${slot.time}, Available: ${slot.available}`);
                        return (
                            <button 
                                key={index} 
                                onClick={() => slot.available && handleTimeSlotSelection(slot.time, 2)}
                                className={slot.available ? "" : "unavailable-slot"}
                            >
                                {slot.time}
                            </button>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarComponent;

