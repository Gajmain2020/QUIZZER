import express from "express";

import {
  createQuiz,
  getQuizData,
  addQuestionsViaCSV,
  addIndividualQuestion,
  getAllQuizes,
  getAllQuestions,
  editSingleQuestion,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/get-details/:quizName", getQuizData);
router.get("/get-quizes/:teacherId", getAllQuizes);
router.get("/get-all-questions/:quizName", getAllQuestions);
router.post("/create-quiz", createQuiz);
router.post("/add-questions/:quizId", addQuestionsViaCSV);
router.post("/add-individual-question/:quizId", addIndividualQuestion);
router.post("/edit-quiz/:quizId", editSingleQuestion);

export default router;
