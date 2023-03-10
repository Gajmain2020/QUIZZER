import express from "express";

//    importing CONTROLLERS
import {
  signupStudent,
  loginStudent,
  getStudentDetails,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/sign-up", signupStudent);
router.post("/login", loginStudent);
router.get("/get-student-details/:id", getStudentDetails);

export default router;
