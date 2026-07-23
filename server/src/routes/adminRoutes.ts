import express from "express";
import {
  registerAdmin,
  loginAdmin,
  verifyAdmin,
} from "../controllers/adminController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

// Register Admin
router.post("/register", registerAdmin);

// Login Admin
router.post("/login", loginAdmin);

// Verify JWT Token
router.get("/verify", verifyToken, verifyAdmin);

export default router;