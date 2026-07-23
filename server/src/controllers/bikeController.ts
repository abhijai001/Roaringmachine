import { Request, Response } from 'express';
import Bike from '../models/Bike';

export const getBikes = async (req: Request, res: Response) => {
  try {
    const bikes = await Bike.find().sort({ createdAt: -1 });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bikes', error });
  }
};

export const createBike = async (req: Request, res: Response) => {
  try {
    // Cloudinary stores the image URL in file.path 
    const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    
    const newBike = new Bike({ ...req.body, images });
    await newBike.save();
    
    res.status(201).json(newBike);
  } catch (error) {
    res.status(500).json({ message: 'Error creating bike', error });
  }
};