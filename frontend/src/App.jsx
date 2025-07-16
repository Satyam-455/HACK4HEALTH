import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import RequestStatus from './components/RequestStatus';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <Router>
      <Header
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Routes>
        <Route
          path="/"
          element={<Home selectedLanguage={selectedLanguage} />}
        />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/status" element={<RequestStatus />} />
        <Route
          path="/about"
          element={
            <div
              style={{
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
              }}
            >
              <h2>About Us</h2>
              <p>
                This app helps people quickly call medical professionals in emergencies.
                It was built by Team Silverhands for the Hack4Health Hackathon.
              </p>
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
