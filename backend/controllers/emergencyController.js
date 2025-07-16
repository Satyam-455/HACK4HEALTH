const { storeRequest } = require("../utils/storage");
const getLLMAdvice = require("../utils/getLLMAdvice");

exports.requestEmergency = async (req, res) => {
  const data = req.body;

  if (!data.name || !data.age || !data.gender || !data.symptoms) {
    return res.status(400).json({ message: "Missing fields in request." });
  }

  try {
    const aiAdvice = await getLLMAdvice(data.age, data.gender, data.symptoms);

    const requestObj = {
      id: Date.now().toString(),
      patient: data,
      status: "waiting",
      assignedDoctor: null,
      aiUrgency: "pending", // Placeholder, can replace with ML later
      aiAdvice: aiAdvice,
    };

    storeRequest(requestObj);
    res.status(201).json({ message: "Emergency request created", data: requestObj });

  } catch (error) {
    console.error("requestEmergency Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
