import express from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
// create a route for login

export default router;