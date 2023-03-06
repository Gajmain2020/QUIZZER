import express from "express";

//    importing CONTROLLERS
import {
  homepage,
  signupStudent,
  getStudentDetails,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", homepage);
router.post("/sign-up", signupStudent);
router.get("/get-student-details/:id", getStudentDetails);

export default router;
