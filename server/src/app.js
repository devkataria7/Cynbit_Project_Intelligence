import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import { connectDB } from "./config/database.js";
import { Inquiry } from "./models/Inquiry.js";
import { buildProjectBriefPreview } from "./config/recommendationEngine.js";
import { validateInquiry } from "./utils/validation.js";

dotenv.config();

const app = express();

// Allowed origins: local dev frontends + configured FRONTEND_URL
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl or internal) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "20kb" }));

/**
 * Single endpoint: POST /api/inquiries
 * Validates submission, recomputes recommendations, and saves inquiry.
 */
app.post("/api/inquiries", async (req, res) => {
  try {
    const { isValid, fieldErrors, sanitizedData } = validateInquiry(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Please review the submitted information.",
        fieldErrors,
      });
    }

    // Connect to MongoDB Atlas
    await connectDB();

    // Recalculate recommendations on backend (ignoring any client recommendations)
    const preview = buildProjectBriefPreview(sanitizedData);

    // Generate unique inquiry ID
    const inquiryId = `CYN-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    const submittedAt = new Date();

    // Create and save Inquiry document
    const inquiry = new Inquiry({
      inquiryId,
      formData: sanitizedData,
      recommendations: preview.recommendations || [],
    });

    await inquiry.save();

    return res.status(201).json({
      success: true,
      message: "Your project inquiry was submitted successfully.",
      data: {
        inquiryId,
        submittedAt: submittedAt.toISOString(),
      },
    });
  } catch (error) {
    // Avoid returning stack traces or database details
    return res.status(500).json({
      success: false,
      message: "We couldn't submit your inquiry right now. Please try again.",
    });
  }
});

export default app;
