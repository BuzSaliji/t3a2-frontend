import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; 

function CalendarComponent() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [court1TimeSlots, setCourt1TimeSlots] = useState([]);
    const [court2TimeSlots, setCourt2TimeSlots] = useState([]);

    useEffect(() => {
        fetchTimeSlots(selectedDate);
    }, [selectedDate]);

    const onChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const fetchTimeSlots = async (date) => {
        const formattedDate = date.toISOString().split('T')[0];
    
        try {
            // Fetch time slots for Court 1
            const responseCourt1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/timeslots/court1?date=${formattedDate}`);
            const dataCourt1 = await responseCourt1.json();
            setCourt1TimeSlots(dataCourt1);
    
            // Fetch time slots for Court 2
            const responseCourt2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/timeslots/court2?date=${formattedDate}`);
            const dataCourt2 = await responseCourt2.json();
            setCourt2TimeSlots(dataCourt2);
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };

    const handleTimeSlotSelection = (slot, courtNumber) => {
        console.log(`Selected time slot for Court ${courtNumber}:`, slot);
    };

    return (
        <div className="calendar-container">
            <Calendar onChange={onChange} value={selectedDate} />
            <div className="court-time-slots">
                <h3>Court 1</h3>
                <div className="time-slots">
                    {court1TimeSlots.map((slot, index) => (
                        <button key={index} onClick={() => handleTimeSlotSelection(slot, 1)}>
                            {slot}
                        </button>
                    ))}
                </div>
                <h3>Court 2</h3>
                <div className="time-slots">
                    {court2TimeSlots.map((slot, index) => (
                        <button key={index} onClick={() => handleTimeSlotSelection(slot, 2)}>
                            {slot}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
