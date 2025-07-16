# HACK4HEALTH

UBER FOR DOCTORS
-->Overview:
Uber for Doctors is a web and phone application designed to help elderly and at-risk individuals urgently request qualified doctors or nurses to visit their homes. The platform also enables users to schedule appointments in advance, view doctor profiles, and receive AI-based recommendations during emergencies.
The application is built with:
-Frontend: React (Vite)
-Backend: Node.js (Express)
-AI / Machine Learning: Python (XGBoost, OpenAI API)

This project was developed by Team SilverHands from NIT Raipur during a hackathon under the Emergency Response and First Line of Cure problem theme.

We have also hosted the live version of our website at:- https://hack4health-opal.vercel.app/

-->Features:
-Emergency Doctor Dispatch
 Users can instantly request a doctor to their home. Nearby doctors receive notifications, and the system tracks their status in real time.

-Nurse On-Demand
 Option to call a nurse instead of a doctor, using the same request flow.

-Book an Appointment
 Schedule non-urgent appointments by selecting a medical category and choosing a doctor from a curated list.

-Multi-language Support
 The interface supports English, Hindi, and Punjabi for better accessibility.

-AI Recommendations
 While help is on the way, the app displays AI-powered first aid and care instructions generated using:
XGBoost models trained on health datasets
OpenAI GPT API for natural language explanations

-Responsive Design
 Fully responsive UI for both desktop and mobile devices.

-Doctor Profiles
 Each doctor profile displays:
Name
Photo
Specialty
Affiliated hospital in Delhi
Contact number

-->Tech Stack:
React (Vite)
Node.js (Express)
Python (Flask/REST API)
XGBoost
OpenAI GPT API
CSS Modules
Git and GitHub
Vercel (For hosting)

-->Usage:
Emergency Request:
Fill in your details.
Select "Request a Doctor" or "Request a Nurse."
View live status updates and AI recommendations.
Book an Appointment:
Choose a medical category.
Select a doctor with photo and hospital details.
Enter your information and confirm the appointment.
Multi-language:
Use the language selector in the header to switch between English, Hindi, and Punjabi.

-->ML Features:
Multiclass XGBoost Model with hyperparamter tuning.
Predicts patient risk levels and suggests urgency.
Disclaimer: The dataset used to train this model is entirely synthesized. Dataset related to healthcare themes arent easily available as open-source libraries due to privacy concerns. However we have tried to implicate a real life dataset based on biological grounds and a reputable library https://physionet.org/content/mietic/1.0.0/

-->OpenAI GPT:
The system dynamically generates step-by-step first aid instructions based on the user's input symptoms or emergency situation. This ensures that users receive immediate care guidance and timely attention, even before professional medical help arrives. It acts as a virtual first responder, helping reduce panic and enabling quicker, informed actions during critical moments.

-->Future Enhancements:
Real-time WebSocket notifications when a doctor accepts a request
Integration with payment gateways
Geolocation for automatic nearest doctor detection

-->License
This project is for educational and demonstration purposes. Licensing for production use.
