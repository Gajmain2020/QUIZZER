import express from "express";

import { signupAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/sign-up", signupAdmin);

export default router;
