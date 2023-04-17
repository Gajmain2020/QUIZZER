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
  deleteQuiz,
  getAllQuizForStudent,
  attemptQuiz,
  submitQuiz,
  viewAttemptedQuiz,
} from "../controllers/quizController.js";

import { teacherAuth, studentAuth } from "../middleware/allMiddleware.js";

const router = express.Router();

//! Teacher Side API END POINTS !!
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
router.delete("/delete-quiz/:quizName", teacherAuth, deleteQuiz);

//! Student Side API END POINTS !!
router.get("/get-quizes-student/:studentId", studentAuth, getAllQuizForStudent);
router.get("/attempt-quiz/:quizName", studentAuth, attemptQuiz);
router.get("/view-report/:studentId", studentAuth, viewAttemptedQuiz);
router.post("/submit-quiz/:quizName", studentAuth, submitQuiz);

export default router;
