import React, { useState } from 'react';
import './Appointment.css';

function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment data:', formData);
    alert('Appointment booked successfully!');
    setFormData({
      name: '',
      date: '',
      time: '',
      reason: ''
    });
  };

  return (
    <div className="appointment-wrapper">
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for Appointment"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          required
        ></textarea>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointment;
