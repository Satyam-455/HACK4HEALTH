import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RequestStatus.css";

function RequestStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("searching");
  const [doctor, setDoctor] = useState(null);
  const [advice, setAdvice] = useState("");
  const [severity, setSeverity] = useState("Unknown");

  useEffect(() => {
    const state = location.state;
    if (!state?.patient) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setStatus("assigned");
      setDoctor(state.doctor);
      setAdvice(state.advice);
      setSeverity(state.severity);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="status-wrapper">
      {status === "searching" && (
        <>
          <div className="spinner"></div>
          <h2>Contacting doctors nearby...</h2>
          <p>Please wait while we connect you to the nearest available doctor.</p>
        </>
      )}

      {status === "assigned" && doctor && (
        <>
          <h2>Doctor is on the way!</h2>
          <div className="doctor-info">
            <img src={doctor.photo} alt={doctor.name} />
            <div className="doctor-details">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
              <p>{doctor.clinic}</p>
              <p>Contact: {doctor.contact}</p>
            </div>
          </div>

          <div className="recommendations">
            <h4>While the doctor is coming, follow these instructions:</h4>
            <ul>
              <li>Keep the patient calm and comfortable.</li>
              <li>Ensure good ventilation.</li>
              <li>Collect medical records.</li>
              <li><strong>AI Advice:</strong> {advice}</li>
              <li><strong>Predicted Severity:</strong> {severity}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default RequestStatus;