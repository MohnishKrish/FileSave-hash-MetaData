import express from "express";
import multer from "multer";
import { uploadCertificate } from "../controllers/certificateController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });  // ensures req.file exists

router.post("/upload", upload.single("file"), uploadCertificate);

export default router;