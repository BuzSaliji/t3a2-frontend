import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { BookingProvider } from './context/BookingContext';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import CalendarComponent from './components/calendar/Calendar.jsx'; 
import './App.css';

function App() {
  return (
    <UserProvider>
      <BookingProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/calendar" element={<CalendarComponent />} /> 
          </Routes>
        <Footer />
      </Router>
      </BookingProvider>
    </UserProvider>
  );
}

export default App;
