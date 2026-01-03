import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();  // Load .env variables

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
