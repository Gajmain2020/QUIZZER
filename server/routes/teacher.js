import express from "express";
// import { authTeacher } from "../middleware/authTeacher.js";

import {
  getTeacherDetails,
  signupTeacher,
  loginTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/sign-up", signupTeacher);
router.post("/login", loginTeacher);
router.get("/get-teacher-details/:id", getTeacherDetails);

export default router;
