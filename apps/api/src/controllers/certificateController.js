import crypto from "crypto";
import fs from "fs";
import Certificate from "../models/Certificate.js";

export const uploadCertificate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // File path
    const filePath = req.file.path;

    // Hash file using SHA-256
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // Save metadata in DB
    const cert = await Certificate.create({
      filename: req.file.originalname,
      hash,
      path: filePath,
    });

    res.json({
      message: "Certificate uploaded successfully",
      certificateId: cert._id,
      hash,
      filePath
    });

  } catch (err) {
    console.error("Upload error =>", err);
    res.status(500).json({ error: "Upload failed" });
  }
};