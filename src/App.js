import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import './App.css';
import Calendar from 'react-calendar';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/calendar" element={<Calendar />} />   
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
