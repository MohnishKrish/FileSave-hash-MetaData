import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  filename: {type: String, required: true},
  hash: {type: String, required: true,},
  path: {type: String, required: true},
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Certificate", certificateSchema);