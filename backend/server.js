const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/emergency/request", async (req, res) => {
  try {
    const { name, address, phone, chief_complaint, vitals } = req.body;

    if (!name || !chief_complaint || !vitals?.age || !vitals?.gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ML API - Predict severity
    let severity = "Unknown";
    try {
      const mlResp = await axios.post("http://localhost:5000/predict", {
        ...vitals,
        chief_complaint,
      });
      severity = mlResp.data?.prediction || "Unknown";
    } catch (mlErr) {
      console.error("ML API error:", mlErr.message);
    }

    // AI Advice
    const prompt = `A ${vitals.age}-year-old ${vitals.gender.toLowerCase()} is experiencing the following symptoms: ${chief_complaint}. What immediate first aid or care should be given until medical help arrives?`;
    let advice = "Advice could not be generated.";
    try {
      const options = {
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/conversationllama",
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          messages: [{ role: "user", content: prompt }],
          web_access: false,
        },
      };

      const llmRes = await axios.request(options);
      advice = llmRes.data?.result || advice;
    } catch (llmErr) {
      console.error("LLM error:", llmErr.message);
    }

    // Doctor Info
    const doctor = {
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      contact: "+91-9876543210",
      clinic: "City Health Clinic",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    };

    res.json({ advice, severity, doctor });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚑 Server running on http://localhost:${PORT}`);
});
