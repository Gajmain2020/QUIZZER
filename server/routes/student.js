import express from "express";

//    importing CONTROLLERS
import { homepage } from "../controllers/studentController.js";

const router = express.Router();

router.get("/", homepage);

export default router;
