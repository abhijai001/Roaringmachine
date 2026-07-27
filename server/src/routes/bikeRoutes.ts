import express from "express";
import Bike from "../models/bike";
import { upload } from "../config/cloudinary";

const router = express.Router();

//
// GET ALL BIKES
//
router.get("/bikes", async (req, res) => {
  try {
    const search = req.query.search as string;
const brand = req.query.brand as string;

const query: any = {};

if (search) {
  query.$or = [
    { brand: { $regex: search, $options: "i" } },
    { model: { $regex: search, $options: "i" } },
  ];
}

if (brand) {
  query.brand = brand;
}
const bikes = await Bike.find(query).sort({
  createdAt: -1,
});
res.status(200).json(bikes);
  } catch (error) {
    console.error("Error fetching bikes:", error);

    res.status(500).json({
      message: "Failed to load bikes",
    });
  }
});
router.get("/bikes/paginated", async (req, res) => {
  try {
    const search = req.query.search as string;
    const brand = req.query.brand as string;

    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
      query.$or = [
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } },
      ];
    }

    if (brand) {
      query.brand = brand;
    }

    const bikes = await Bike.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Bike.countDocuments(query);

    res.status(200).json({
      bikes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching paginated bikes:", error);

    res.status(500).json({
      message: "Failed to load bikes",
    });
  }
});
//
// GET SINGLE BIKE
//
router.get("/bikes/:id", async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    res.status(200).json(bike);
  } catch (error) {
    console.error("Error fetching bike:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

//
// ADD BIKE
//
router.post("/add-bike", upload.array("image",10), async (req, res) => {
  try {
    const {
  title,
  brand,
  model,
  year,
  price,
  mileage,
  engineCapacity,
  description,
  isAvailable,
  isFeatured,
} = req.body;

    const files = req.files as Express.Multer.File[];

if (!files || files.length === 0) {
  return res.status(400).json({
    message: "Image upload failed",
  });
}

    const bike = new Bike({
      title,
      brand,
      model,
      year: Number(year),
      price: Number(price),
      mileage: Number(mileage),
      engineCapacity,
      description,
      images: files.map((file) => file.path),
      isAvailable: isAvailable === "true",
      isFeatured: isFeatured === "true",
    });

    await bike.save();

    res.status(201).json({
      message: "Bike listed successfully",
      bike,
    });
  } catch (error) {
    console.error("Error saving bike:", error);

    res.status(500).json({
      message: "Server error while saving bike",
    });
  }
});
//
// UPDATE BIKE
//
router.put(
  "/bikes/:id",
  upload.array("image", 10),
  async (req, res) => {
    try {
      const {
  title,
  brand,
  model,
  year,
  price,
  mileage,
  engineCapacity,
  description,
  isAvailable,
  isFeatured,
} = req.body;

      const bike = await Bike.findById(req.params.id);

      if (!bike) {
        return res.status(404).json({
          message: "Bike not found",
        });
      }

      bike.title = title ?? bike.title;
      bike.brand = brand ?? bike.brand;
      bike.model = model ?? bike.model;
      bike.year = year ? Number(year) : bike.year;
      bike.price = price ? Number(price) : bike.price;
      bike.mileage = mileage ? Number(mileage) : bike.mileage;
      bike.engineCapacity =
        engineCapacity ?? bike.engineCapacity;
      bike.description =
        description ?? bike.description;
if (isAvailable !== undefined) {
  bike.isAvailable = isAvailable === "true";
}

if (isFeatured !== undefined) {
  bike.isFeatured = isFeatured === "true";
}
      const files = req.files as Express.Multer.File[];

if (files && files.length > 0) {
  bike.images = files.map((file) => file.path);
}

      await bike.save();

      res.status(200).json({
        message: "Bike updated successfully",
        bike,
      });
    } catch (error) {
      console.error("Error updating bike:", error);

      res.status(500).json({
        message: "Failed to update bike",
      });
    }
  }
);
//
// DELETE BIKE
//
router.delete("/bikes/:id", async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);

    if (!bike) {
      return res.status(404).json({
        message: "Bike not found",
      });
    }

    res.status(200).json({
      message: "Bike deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bike:", error);

    res.status(500).json({
      message: "Failed to delete bike",
    });
  }
});

export default router;