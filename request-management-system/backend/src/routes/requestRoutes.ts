import express from "express";
import {
  getRequests,
  addRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/requestController";

const router = express.Router();

router.get("/requests", getRequests);
router.post("/requests", addRequest);
router.patch("/requests/:id", updateRequest);
router.delete("/requests/:id", deleteRequest);

export default router;
