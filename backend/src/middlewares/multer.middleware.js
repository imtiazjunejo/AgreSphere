// src/middlewares/multer.middleware.js
import multer from "multer";
import fs from "fs";
import path from "path";

const TEMP_DIR = path.resolve(process.cwd(), "public", "temp");
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || "";
    const base = Date.now() + "-" + Math.random().toString(36).slice(2);
    cb(null, `${base}${ext}`);
  },
});

export const upload = multer({ storage });
