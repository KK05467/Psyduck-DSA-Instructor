import express from "express";
import cors from "cors";
import { askDSA } from "./DSA.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "PsyDuck is Running",
  });
});

// Ask AI route
app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        answer: "Please provide a question.",
      });
    }

    const answer = await askDSA(question);

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error("Server Error:", err);

    return res.status(500).json({
      success: false,
      answer: "psy-psy… API failed 🌀",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Port for local + deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});