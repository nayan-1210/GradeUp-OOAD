import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Home2 from './components/Home2';
import Prof1 from './components/Prof1';
import Student from './components/Student';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Navbar2/>
      <Routes>
         {/* Wrap Prof in a Route */}
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/> {/* Wrap Login in a Route */}
        {/* <Route path="/" element={<Home />}/> */}
        <Route path="/" element={<Home2 />}/>
        <Route path="/login/profProfile/:id" element={<Prof1 />} /> 
        <Route path="/login/studentProfile/:id" element={<Student/>}/>
      </Routes>
    </Router>
  );
}

export default App;
