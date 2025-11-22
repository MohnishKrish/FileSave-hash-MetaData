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
      uploadedAt: new Date()
    });

    res.json({
      message: "Certificate uploaded successfully",
      certificateId: cert._id,
      hash,
      filePath: cert.path
    });

  } catch (err) {
    console.error("Upload error =>", err);
    res.status(500).json({ error: "Upload failed" });
  }
};
// --------------------
//  GET /certificates/:id
// --------------------

export const getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    const cert = await Certificate.findById(id);

    if (!cert) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.json({
      certificateId: cert._id,
      filename: cert.filename,
      hash: cert.hash,
      path: cert.path,
      uploadedAt: cert.uploadedAt
    });

  } catch (err) {
    console.error("Fetch error =>", err);
    res.status(500).json({ error: "Failed to fetch certificate" });
  }
};