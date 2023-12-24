import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { BookingProvider } from './context/BookingContext';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import CalendarComponent from './components/calendar/Calendar.jsx'; 
import Confirmation from './components/confirmation/Confirmation.jsx';
import './App.scss';
import AdminBookingManagement from './components/admin/AdminBookingManagement.jsx';

function App() {
  return (
    <UserProvider>
      <BookingProvider>
        <Router>
          <div className="page-container">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/calendar" element={<CalendarComponent />} /> 
                <Route path="/confirmation/:bookingId" element={<Confirmation />} />
                <Route path="/admin" element={<AdminBookingManagement />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </BookingProvider>
    </UserProvider>
  );
}

export default App;

