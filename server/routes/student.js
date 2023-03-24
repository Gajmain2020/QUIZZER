import express from "express";

//    importing CONTROLLERS
import {
  signupStudent,
  loginStudent,
  getStudentDetails,
  getAllStudents,
  getStudentByFilter,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/sign-up", signupStudent);
router.post("/login", loginStudent);
router.get("/get-student-details/:id", getStudentDetails);
router.get("/get-students-in/:department", getAllStudents);
router.get("/search", getStudentByFilter);

export default router;
