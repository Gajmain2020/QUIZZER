import express from "express";

import {
  signupAdmin,
  loginAdmin,
  getAdminDetails,
  addStudentViaAdmin,
  addTeacherViaAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/sign-up", signupAdmin);
router.post("/login", loginAdmin);
router.post("/addTeacherViaAdmin", addTeacherViaAdmin);
router.post("/addStudentViaAdmin", addStudentViaAdmin);
router.get("/getAdmin/:id", getAdminDetails);

export default router;
