import { Router } from "express";
import { getEvents, getEvent, createEvent, uploadEvent } from "../controllers/eventController.js";
import protect from "../middlewares/authMiddleware.js";
import { upload } from "../config/cloudinary.js";

const router = Router();

router.route("/").get(getEvents);
router.route("/:id").get(getEvent);
router.route("/").post(protect, createEvent);
router.route("/uploadEvent").post(protect, upload.single("file"), uploadEvent);

export default router;