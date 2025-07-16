import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      heading: 'Get Urgent Medical Help at Home',
      subtitle: 'Trusted doctors and nurses available 24x7 near you.',
      scheduleAppointment: 'Schedule Appointment',
      requestEmergency: 'Request Emergency Doctor',
      submitRequest: 'Submit Request'
    }
  },
  hi: {
    translation: {
      heading: 'घर पर तुरंत चिकित्सा सहायता प्राप्त करें',
      subtitle: 'विश्वसनीय डॉक्टर और नर्सें 24x7 आपके पास उपलब्ध हैं।',
      scheduleAppointment: 'अपॉइंटमेंट बुक करें',
      requestEmergency: 'आपातकालीन डॉक्टर बुलाएं',
      submitRequest: 'अनुरोध सबमिट करें'
    }
  },
  pa: {
    translation: {
      heading: 'ਘਰ \'ਤੇ ਤੁਰੰਤ ਮੈਡੀਕਲ ਮਦਦ ਲਓ',
      subtitle: 'ਭਰੋਸੇਯੋਗ ਡਾਕਟਰ ਅਤੇ ਨਰਸ 24x7 ਤੁਹਾਡੇ ਨੇੜੇ ਉਪਲਬਧ ਹਨ।',
      scheduleAppointment: 'ਮਿਲਣ ਦਾ ਸਮਾਂ ਬੁੱਕ ਕਰੋ',
      requestEmergency: 'ਐਮਰਜੈਂਸੀ ਲਈ ਡਾਕਟਰ ਬੁਲਾਓ',
      submitRequest: 'ਬੇਨਤੀ ਭੇਜੋ'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
