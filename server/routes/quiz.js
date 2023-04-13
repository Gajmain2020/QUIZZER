import express from "express";

import {
  createQuiz,
  getQuizData,
  addQuestionsViaCSV,
  addIndividualQuestion,
  getAllQuizes,
  getAllQuestions,
  editSingleQuestion,
  deleteSingleQuestion,
} from "../controllers/quizController.js";

import { teacherAuth } from "../middleware/allMiddleware.js";

const router = express.Router();

router.get("/get-details/:quizName", teacherAuth, getQuizData);
router.get("/get-quizes/:teacherId", teacherAuth, getAllQuizes);
router.get("/get-all-questions/:quizName", teacherAuth, getAllQuestions);
router.post("/create-quiz", teacherAuth, createQuiz);
router.post("/add-questions/:quizId", teacherAuth, addQuestionsViaCSV);
router.post(
  "/add-individual-question/:quizId",
  teacherAuth,
  addIndividualQuestion
);
router.post("/edit-quiz/:quizId", teacherAuth, editSingleQuestion);
router.delete(
  "/delete-question/:quizId/:questionId",
  teacherAuth,
  deleteSingleQuestion
);

export default router;
