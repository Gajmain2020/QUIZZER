import express from "express";

import {
  getTeacherDetails,
  homepage,
  signupTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", homepage);
router.post("/sign-up", signupTeacher);
router.get("/get-teacher-details/:id", getTeacherDetails);

export default router;
