const mongoose = require("mongoose");

// Reuse one connection across requests. On Vercel each function instance
// keeps its module state between invocations, so we only connect once.
let connection = null;

function connectDB() {
  if (!process.env.MONGO_URI) {
    return Promise.reject(new Error("MONGO_URI is missing"));
  }
  if (!connection) {
    connection = mongoose.connect(process.env.MONGO_URI).catch((err) => {
      connection = null; // allow a retry on the next request
      throw err;
    });
  }
  return connection;
}

module.exports = connectDB;
