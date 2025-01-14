import { Router } from "express";
import { getEvents, getEvent } from "../controllers/eventController.js";


const router = Router();

router.route("/").get(getEvents);
router.route("/:id").get(getEvent);


export default router;