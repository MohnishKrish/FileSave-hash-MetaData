import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  filename: String,
  hash: String,
  uploadedAt: Date,
});

export default mongoose.model("Certificate", certificateSchema);