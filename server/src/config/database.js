import mongoose from "mongoose";

let isConnected = false;

/**
 * Connects to MongoDB Atlas using MONGODB_URI.
 * Reuses existing connection across serverless/Vercel function invocations.
 */
export async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = db.connections[0].readyState === 1;
    return db;
  } catch (error) {
    // Avoid logging sensitive credentials
    console.error("MongoDB connection failed:", error.name || "ConnectionError");
    throw error;
  }
}
