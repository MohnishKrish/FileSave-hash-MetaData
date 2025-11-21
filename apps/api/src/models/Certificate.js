import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  filename: String,
  hash: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Certificate", certificateSchema);