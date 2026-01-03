// server.js
import express from "express";
import cors from "cors";
import { askDSA } from "./DSA.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const answer = await askDSA(question); // must return a string
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.json({ answer: "psy-psy… API failed 🌀" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
