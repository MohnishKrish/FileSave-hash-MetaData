import express from "express";
import multer from "multer";
import { uploadCertificate } from "../controllers/certificateController.js";
import { getCertificateById } from "../controllers/certificateController.js";


const router = express.Router();

// Save files into uploads/ folder
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadCertificate);
router.get("/:id", getCertificateById);

export default router;