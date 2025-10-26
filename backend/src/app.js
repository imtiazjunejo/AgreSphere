import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

// ✅ Enable CORS for frontend (Vite default: 5173)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Core middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ✅ Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Static folders
// ✅ Static folders
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/temp", express.static(path.join(__dirname, "../temp"))); // for temp images
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public"))); // fallback

// ✅ Routes
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import croplogRouter from "./routes/croplog.routes.js";
import profitLossRouter from "./routes/profitLoss.routes.js";
import farmerNetworkRoutes from "./routes/farmerNetwork.routes.js";
import connectionRoutes from "./routes/connection.routes.js";
import profileRoutes from "./routes/profile.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/crop-logs", croplogRouter);
app.use("/api/v1/profitloss", profitLossRouter);
app.use("/api/v1/network", farmerNetworkRoutes);
app.use("/api/v1/connection", connectionRoutes);
app.use("/api/v1/profile", profileRoutes);

// ✅ Global error handler
app.use(errorHandler);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 AgriSphere API is running successfully...");
});
