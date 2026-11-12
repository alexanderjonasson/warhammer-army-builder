require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Unit = require("./models/warhammer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Warhammer 40k API is running" });
});

app.get("/api/units", async (req, res) => {
  try {
    const units = await Unit.find().sort({ faction: 1, name: 1 });
    res.json(units);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Could not fetch units" });
  }
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI saknas");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

start();
