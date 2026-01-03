// dsa.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyA2FKN-tp12xUzwbHVgA7YaAPp56oaGyoc" });

export async function askDSA(question) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: question
    });
    return response.text;
  } catch (err) {
    console.error("Error in askDSA:", err);
    return "psy-psy… AI is confused 🌀";
  }
}
