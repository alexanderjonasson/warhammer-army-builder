// Local development entry point: `npm run dev`.
// On Vercel, api/index.ts is used instead.
import "dotenv/config";
import app from "./app";
import { connectDB } from "./db";

const PORT = Number(process.env.PORT) || 5000;

async function start() {
  try {
    await connectDB();
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

start();
