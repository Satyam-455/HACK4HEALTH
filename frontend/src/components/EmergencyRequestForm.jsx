import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmergencyRequestForm.css";

const genderOptions = ["M", "F"];

function EmergencyRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    chief_complaint: "",
    vitals: {
      age: "",
      gender: "",
      heart_rate: "",
      sbp: "",
      dbp: "",
      spo2: "",
      resp_rate: "",
      temperature: ""
    }
  });

  const [showVitals, setShowVitals] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(formData.vitals).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude}, ${position.coords.longitude}`;

        setFormData((prev) => ({
          ...prev,
          address: coords
        }));
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.chief_complaint ||
      !formData.vitals.age ||
      !formData.vitals.gender
    ) {
      alert("Please fill out required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/emergency/request",
        formData
      );

      navigate("/status", {
        state: {
          doctor: response.data.doctor,
          advice: response.data.advice,
          severity: response.data.severity,
          patient: formData
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit emergency request");
    }
  };

  return (
    <div className="emergency-form-wrapper">
      <form className="emergency-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="address-row">
          <input
            type="text"
            name="address"
            placeholder="Address or Coordinates"
            value={formData.address}
            onChange={handleChange}
          />
          <button
            type="button"
            className="location-btn"
            onClick={handleLocation}
          >
            Use Current Location
          </button>
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="chief_complaint"
          placeholder="Describe Chief Complaint"
          value={formData.chief_complaint}
          onChange={handleChange}
          rows="3"
          required
        />

        <label>Age (years):</label>
        <input
          type="number"
          name="age"
          value={formData.vitals.age}
          onChange={handleChange}
          required
          min="0"
          max="120"
        />

        <label>Gender:</label>
        <select
          name="gender"
          value={formData.vitals.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          {genderOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="toggle-vitals-btn"
          onClick={() => setShowVitals((prev) => !prev)}
        >
          {showVitals ? "Hide Vitals" : "Fill Vitals"}
        </button>

        {showVitals && (
          <div className="vitals-section">
            <label>Heart Rate (bpm):</label>
            <input
              type="number"
              name="heart_rate"
              value={formData.vitals.heart_rate}
              onChange={handleChange}
              min="0"
              max="220"
            />

            <label>SBP (mmHg):</label>
            <input
              type="number"
              name="sbp"
              value={formData.vitals.sbp}
              onChange={handleChange}
              min="0"
              max="300"
            />

            <label>DBP (mmHg):</label>
            <input
              type="number"
              name="dbp"
              value={formData.vitals.dbp}
              onChange={handleChange}
              min="0"
              max="200"
            />

            <label>SpO2 (%):</label>
            <input
              type="number"
              name="spo2"
              value={formData.vitals.spo2}
              onChange={handleChange}
              min="0"
              max="100"
            />

            <label>Respiratory Rate (breaths/min):</label>
            <input
              type="number"
              name="resp_rate"
              value={formData.vitals.resp_rate}
              onChange={handleChange}
              min="0"
              max="60"
            />

            <label>Temperature (°F):</label>
            <input
              type="number"
              name="temperature"
              value={formData.vitals.temperature}
              onChange={handleChange}
              min="80"
              max="110"
            />
          </div>
        )}

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default EmergencyRequestForm;