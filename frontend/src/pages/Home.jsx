import React from 'react';
import EmergencyRequestForm from '../components/EmergencyRequestForm';
import { Link } from 'react-router-dom';
import './Home.css';

const translations = {
  en: {
    title: "Call a Doctor Urgently",
    appointment: "Or Book an Appointment"
  },
  hi: {
    title: "डॉक्टर को तुरंत बुलाएं",
    appointment: "या अपॉइंटमेंट बुक करें"
  },
  pa: {
    title: "ਡਾਕਟਰ ਨੂੰ ਤੁਰੰਤ ਬੁਲਾਓ",
    appointment: "ਜਾਂ ਮੀਟਿੰਗ ਬੁਕ ਕਰੋ"
  }
};

function Home({ selectedLanguage = 'en' }) {
  const t = translations[selectedLanguage] || translations.en;

  return (
    <div className="home">
      <h1>{t.title}</h1>
      <EmergencyRequestForm />
      <Link to="/appointment" className="appointment-link">{t.appointment}</Link>
    </div>
  );
}

export default Home;
