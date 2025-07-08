const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, 
  baseURL: "https://openrouter.ai/api/v1",
});

router.post("/suggest-specialist", async (req, res) => {
  try {
    const { symptoms } = req.body;

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a medical assistant. Suggest 1–3 medical specializations based on the patient's symptoms. and give reply in short",
        },
        {
          role: "user",
          content: `Symptoms: ${symptoms}`,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

module.exports = router;
