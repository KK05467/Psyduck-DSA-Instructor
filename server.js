import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { askDSA } from "./DSA.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        answer: "Please enter a question.",
      });
    }

    const answer = await askDSA(question);

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (err) {
    console.error("Server Error:", err);

    res.status(500).json({
      success: false,
      answer: "psy-psy… API failed 🌀",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});