import express from "express";

import { homepage, signupTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", homepage);
router.post("/sign-up", signupTeacher);

export default router;
