const axios = require("axios");

const getLLMAdvice = async (age, gender, symptoms) => {
  const prompt = `A ${age}-year-old ${gender.toLowerCase()} is experiencing ${symptoms}. What immediate first aid or care should be given until medical help arrives?`;

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

  try {
    const response = await axios.request(options);
    return response.data.result || "Advice could not be generated.";
  } catch (error) {
    console.error("LLM API Error:", error.response?.data || error.message);
    return "AI service is currently unavailable. Please consult a doctor.";
  }
};

module.exports = getLLMAdvice;
