import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin";

// Register a new admin
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating admin",
      error,
    });
  }
};

// Admin Login
export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "supersecretkey",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login error",
      error,
    });
  }
};

// Verify Admin Token
export const verifyAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({
    authenticated: true,
    message: "Token is valid",
  });
};