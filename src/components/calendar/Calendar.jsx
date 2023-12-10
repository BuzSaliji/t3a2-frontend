import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; 

function CalendarComponent() {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
            />
        </div>
    );
}

export default CalendarComponent;
