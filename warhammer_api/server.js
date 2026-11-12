// Local development entry point: `npm start`.
// On Vercel, api/index.js is used instead.
require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
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
