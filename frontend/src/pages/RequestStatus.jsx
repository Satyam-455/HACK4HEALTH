import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RequestStatus.css';

function RequestStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('searching');
  const [doctor, setDoctor] = useState(null);

  // In case user navigates here directly without data
  useEffect(() => {
    if (!location.state?.patient) {
      console.warn('No patient data found. Redirecting to home.');
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setStatus('assigned');
      setDoctor({
        name: 'Dr. Priya Sharma',
        specialty: 'General Physician',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        contact: '+91-9876543210',
        clinic: 'City Health Clinic'
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="status-wrapper">
      {status === 'searching' && (
        <>
          <div className="spinner"></div>
          <h2>Contacting doctors nearby...</h2>
          <p>Please wait while we connect you to the nearest available doctor.</p>
        </>
      )}

      {status === 'assigned' && doctor && (
        <>
          <h2>Doctor is on the way!</h2>
          <div className="doctor-info">
            <img src={doctor.photo} alt={doctor.name} />
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>{doctor.clinic}</p>
              <p>Contact: {doctor.contact}</p>
            </div>
          </div>
          <div className="recommendations">
            <h4>While the doctor is coming, follow these instructions:</h4>
            <ul>
              <li>Keep the patient comfortable and calm.</li>
              <li>Ensure good ventilation in the room.</li>
              <li>Gather any medical records or prescriptions.</li>
              <li><em>[AI Recommendations will appear here]</em></li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default RequestStatus;
