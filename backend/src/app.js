import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";


export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes decleration
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import croplogRouter from "./routes/croplog.routes.js";
import profitLossRouter from "./routes/profitLoss.routes.js";


// Routes calls
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/crop-logs", croplogRouter);
app.use("/api/v1/profitloss", profitLossRouter);

app.use(errorHandler)
