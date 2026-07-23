import { Request, Response } from 'express';
import SellRequest from '../models/SellRequest';
import Bike from "../models/bike";
export const createSellRequest = async (req: Request, res: Response) => {
  try {
    const newRequest = new SellRequest({
  ...req.body,
  images: req.file ? [req.file.path] : [],
});
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting request', error });
  }
};

export const getSellRequests = async (req: Request, res: Response) => {
  try {
    const requests = await SellRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests', error });
  }
};
export const approveSellRequest = async (
  req: Request,
  res: Response
) => {
  try {
 const request = await SellRequest.findById(req.params.id);

if (!request) {
  return res.status(404).json({
    message: "Request not found",
  });
}

if (request.status === "Approved") {
  return res.status(400).json({
    message: "This request has already been approved.",
  });
}

    const bike = new Bike({
      title: request.title,
      brand: request.brand,
      model: request.model,
      price: request.price,
      year: request.year,
      mileage: request.mileage,
      engineCapacity: request.engineCapacity,
      images: request.images,
      description: request.description,
      isAvailable: true,
      isFeatured: false,
    });

    await bike.save();

    request.status = "Approved";
    await request.save();

    res.status(200).json({
      message: "Request approved successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to approve request",
    });
  }
};
export const rejectSellRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const request = await SellRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status === "Rejected") {
      return res.status(400).json({
        message: "This request has already been rejected.",
      });
    }

    request.status = "Rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to reject request",
    });
  }
};