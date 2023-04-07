import express from "express";

import { createQuiz, getQuizData } from "../controllers/quizController.js";

const router = express.Router();

router.post("/create-quiz", createQuiz);
router.get("/get-details/:quizName", getQuizData);

export default router;
