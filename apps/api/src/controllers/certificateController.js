import crypto from "crypto";
import fs from "fs";                     // FIX 1: Import fs properly
import { uploadToIPFS } from "../services/ipfsService.js";
import Certificate from "../models/Certificate.js";

export const uploadCertificate = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // 1️⃣ Hash the certificate (SHA-256)
    const fileBuffer = fs.readFileSync(filePath);  // FIX 2: correct method
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    // 2️⃣ Upload file to IPFS using your service
    const ipfsCid = await uploadToIPFS(filePath);  // FIX 3: correct call

    // 3️⃣ Save certificate metadata to MongoDB
    const certificate = await Certificate.create({
      filename: req.file.originalname,
      hash,
      ipfsCid,
      uploadedAt: new Date()
    });

    // 4️⃣ Response
    res.json({
      message: "Certificate uploaded successfully",
      certificateId: certificate._id,
      hash,
      ipfsCid
    });

  } catch (err) {
    console.error("Upload error =>", err);
    res.status(500).json({ error: "Upload failed" });
  }
};