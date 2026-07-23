import dns from "dns";


dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/admin";
import bikeRoutes from "./routes/bikeRoutes";
import adminRoutes from "./routes/adminRoutes";
import sellRequestRoutes from "./routes/sellRequestRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===========================
// MongoDB Connection
// ===========================

async function createDefaultAdmin() {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@roaringmachines.com",
    });

    if (existingAdmin) {
      console.log("Default admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await Admin.create({
      email: "admin@roaringmachines.com",
      password: hashedPassword,
    });

    console.log("✅ Default admin created");
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
}
mongoose
  .connect(process.env.MONGO_URI!)
  .then(async () => {
    console.log("Connected to MongoDB");

    await createDefaultAdmin();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ===========================
// Routes
// ===========================
app.use("/api", bikeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sell-request", sellRequestRoutes);

// ===========================
// Default Route
// ===========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Roaring Machine API is running 🚀",
  });
});

// ===========================
// 404 Handler
// ===========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===========================
// Start Server
// ===========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});