import express from "express";
import { upload } from "../config/cloudinary";
import {
  createSellRequest,
  getSellRequests,
  approveSellRequest,
  rejectSellRequest,
} from "../controllers/sellRequestController";

const router = express.Router();

router.post("/", upload.single("image"), createSellRequest);

router.get("/", getSellRequests);

router.put("/:id/approve", approveSellRequest);
router.put("/:id/reject", rejectSellRequest);
export default router;