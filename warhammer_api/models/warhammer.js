const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    faction: { type: String, required: true },
    role: { type: String, required: true },
    points: { type: Number, required: true },
    keywords: [{ type: String }],
  },
  { versionKey: false },
);

module.exports = mongoose.model("Unit", unitSchema);
