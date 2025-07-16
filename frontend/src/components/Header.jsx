import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ selectedLanguage, setSelectedLanguage }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="logo">DoctorOnCall</h1>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/appointment">Book Appointment</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className="language-selector">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="pa">ਪੰਜਾਬੀ</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
