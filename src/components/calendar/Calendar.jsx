import React, { useEffect, useContext, useCallback } from 'react';
import { BookingContext } from '../../context/BookingContext';
import Calendar from 'react-calendar';
import Modal from '../modal/Modal';
import 'react-calendar/dist/Calendar.css';
import './Calendar.scss';

function CalendarComponent() {
    // Destructuring context values
    const {
        selectedDate,
        setSelectedDate,
        court1Bookings,
        setCourt1Bookings,
        court2Bookings,
        setCourt2Bookings,
        selectedBooking,
        setSelectedBooking
    } = useContext(BookingContext);

    // Fetches bookings for a given date
    const fetchBookings = useCallback(async (date) => {
        // Formatting the date to ISO string and extracting the date part
        const formattedDate = date.toISOString().split('T')[0];
        // Hardcoded court IDs
        const court1Id = '65768b76da0ab5cec28c9f33'; 
        const court2Id = '65768b76da0ab5cec28c9f34'; 
        const token = localStorage.getItem('token');

        try {
            // Fetching bookings for Court 1
            const responseCourt1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/by-court?courtId=${court1Id}&startDate=${formattedDate}&endDate=${formattedDate}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!responseCourt1.ok) {
                throw new Error('Failed to fetch bookings for Court 1');
            }
            const dataCourt1 = await responseCourt1.json();
            setCourt1Bookings(dataCourt1);

            // Fetching bookings for Court 2
            const responseCourt2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bookings/by-court?courtId=${court2Id}&startDate=${formattedDate}&endDate=${formattedDate}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!responseCourt2.ok) {
                throw new Error('Failed to fetch bookings for Court 2');
            }
            const dataCourt2 = await responseCourt2.json();
            setCourt2Bookings(dataCourt2);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }, [setCourt1Bookings, setCourt2Bookings]);

    // Effect to fetch bookings when selectedDate changes
    useEffect(() => {
        fetchBookings(selectedDate);
    }, [selectedDate, fetchBookings]);

    // Handles date change in the calendar
    const onChange = (newDate) => {
        setSelectedDate(newDate);
        fetchBookings(newDate);
    };

    // Calculates available time slots based on bookings
    const calculateAvailableTimeSlots = (bookings) => {
        const operatingHours = { start: 9, end: 18 };
        const timeSlots = [];
    
        for (let hour = operatingHours.start; hour < operatingHours.end; hour++) {
            const slotStart = new Date(selectedDate);
            slotStart.setHours(hour, 0, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setHours(hour + 1, 0, 0, 0);
    
            // Checking if the slot is available
            const isAvailable = !bookings.some(booking => {
                const bookingStart = new Date(booking.timeSlot.start);
                const bookingEnd = new Date(booking.timeSlot.end);
                return slotStart < bookingEnd && slotEnd > bookingStart;
            });
    
            timeSlots.push({ time: `${hour.toString().padStart(2, '0')}:00`, available: isAvailable });
        }
    
        return timeSlots;
    };

    // Handles selection of a time slot
    const handleTimeSlotSelection = (slot, courtNumber) => {
        const newBooking = { time: slot.time, courtNumber: courtNumber, date: selectedDate };
        setSelectedBooking(newBooking);
    };

    // Calculating available time slots for each court
    const court1TimeSlots = calculateAvailableTimeSlots(court1Bookings);
    const court2TimeSlots = calculateAvailableTimeSlots(court2Bookings);

    return (
        <div className="main-container">
            <div className="calendar-container">
                <Calendar onChange={onChange} value={selectedDate} />
            </div>
    
            <div className="court-time-slots-container">
                {/* Court 1 Time Slots */}
                <div className="court-container">
                    <h3>Court 1</h3>
                    <div className="time-slots">
                        {court1TimeSlots.map((slot, index) => (
                            <button 
                                key={index} 
                                onClick={() => slot.available && handleTimeSlotSelection(slot, 1)}
                                className={slot.available ? "" : "unavailable-slot"}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
    
                {/* Court 2 Time Slots */}
                <div className="court-container">
                    <h3>Court 2</h3>
                    <div className="time-slots">
                        {court2TimeSlots.map((slot, index) => (
                            <button 
                                key={index} 
                                onClick={() => slot.available && handleTimeSlotSelection(slot, 2)}
                                className={slot.available ? "" : "unavailable-slot"}
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for selected booking */}
            {selectedBooking && (
                <Modal
                    selectedBooking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}

export default CalendarComponent;
