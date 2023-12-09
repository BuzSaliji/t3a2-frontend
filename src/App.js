import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />    
      </Routes>
    </Router>
  );
}

export default App;
