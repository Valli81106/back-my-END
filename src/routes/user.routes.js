import { Router } from "express";
import { registerUser } from "../contoller/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)


export default router