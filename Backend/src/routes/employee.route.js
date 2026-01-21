import { Router } from "express";
import { logIn, logout, registerEmployee } from "../controllers/employee.controller.js";
import { verifyJWT } from "../middleware/Auth.middleware.js";

const router = Router();



router.route("/register").post(registerEmployee)
router.route("/login").post(logIn);
router.route("/logout").post(verifyJWT , logout)

export default router;