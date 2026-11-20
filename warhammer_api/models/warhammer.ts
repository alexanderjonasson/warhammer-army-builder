import mongoose from "mongoose";

// The shape of one unit in the database
export interface Unit {
  name: string;
  faction: string;
  role: string;
  points: number;
  keywords: string[];
}

const unitSchema = new mongoose.Schema<Unit>(
  {
    name: { type: String, required: true },
    faction: { type: String, required: true },
    role: { type: String, required: true },
    points: { type: Number, required: true },
    keywords: [{ type: String }],
  },
  { versionKey: false },
);

export const UnitModel = mongoose.model<Unit>("Unit", unitSchema);
