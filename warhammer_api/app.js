const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Unit = require("./models/warhammer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Warhammer 40k API is running" });
});

app.get("/api/units", async (req, res) => {
  try {
    await connectDB();
    const units = await Unit.find().sort({ faction: 1, name: 1 });
    res.json(units);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Could not fetch units" });
  }
});

module.exports = app;
