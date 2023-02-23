import express from "express";

//    importing CONTROLLERS
import { homepage, signupStudent } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", homepage);
router.post("/sign-up", signupStudent);

export default router;
