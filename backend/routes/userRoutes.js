import Router from "express";
import { authUser, registerUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";


const router = Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);

export default router;

