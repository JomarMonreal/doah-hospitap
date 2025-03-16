import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Appointments from './components/AppointmentComponent';
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Navigation */}
        <nav className="app__nav">
          <ul className="app__nav-list">
            <li className="app__nav-item"><Link className="app__nav-link" to="/">Appointments</Link></li>
            <li className="app__nav-item"><Link className="app__nav-link" to="/messages">Messages</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <div className="app__content">
          <Routes>
            <Route path="/" element={<Appointments />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
