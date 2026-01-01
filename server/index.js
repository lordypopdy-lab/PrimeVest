import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected successfully!'))
  .catch((error) => console.log('Database not connected', error));

// Allowed origins
const allowedOrigins = [
  "https://prime-vest-kyc.vercel.app",
  "https://prime-vest-neon.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
];

// Global CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Handle preflight OPTIONS requests explicitly
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// Parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/", authRoute);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`PrimeVest Markets is Running at Port: ${PORT}`);
});
