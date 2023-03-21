import express from "express";

import {
  signupAdmin,
  loginAdmin,
  getAdminDetails,
  addStudentViaAdmin,
  addTeacherViaAdmin,
  getUnauthorizedStudentInfo,
  getUnauthorizedTeacherInfo,
  approveStudent,
  approveTeacher,
  rejectStudent,
  rejectTeacher,
  addStudentViaCSV,
  addTeacherViaCSV,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/sign-up", signupAdmin);
router.post("/login", loginAdmin);
router.post("/addTeacherViaAdmin", addTeacherViaAdmin);
router.post("/addStudentViaAdmin", addStudentViaAdmin);
router.post("/add-student-via-csv", addStudentViaCSV);
router.post("/add-teacher-via-csv", addTeacherViaCSV);
router.patch("/approve-student", approveStudent);
router.patch("/approve-teacher", approveTeacher);
router.delete("/reject-student/:id", rejectStudent);
router.delete("/reject-teacher/:id", rejectTeacher);
router.get("/getAdmin/:id", getAdminDetails);
router.get("/unauthorized-student", getUnauthorizedStudentInfo);
router.get("/unauthorized-teacher", getUnauthorizedTeacherInfo);

export default router;
