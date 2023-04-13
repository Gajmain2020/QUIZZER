import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminSchema from "../models/admin.js";
import TeacherSchema from "../models/teacher.js";
import StudentSchema from "../models/student.js";
import QuizSchema from "../models/quiz.js";

export const createQuiz = async (req, res) => {
  try {
    const data = req.body;
    const isQuizExisting = await QuizSchema.findOne({
      quizName: data.quizName,
    });
    if (isQuizExisting) {
      return res.status(403).json({
        message: "A quiz with name " + data.quizName + " already exists",
        successful: false,
      });
    }
    const teacher = await TeacherSchema.findOne({
      _id: data.creator.id,
    });
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher with name " + data.creator.name + " not found",
        successful: false,
      });
    }

    const result = await QuizSchema.create({
      quizName: data.quizName,
      semester: data.semester,
      department: data.department,
      creator: {
        creatorName: data.creator.name,
        creatorId: data.creator.id,
      },
    });
    teacher.createdQuiz.push({
      semester: result.semester,
      quizName: result.quizName,
      quizId: result._id,
    });
    const updatedTeacher = await TeacherSchema.findByIdAndUpdate(
      data.creator.id,
      teacher,
      { new: true }
    );

    return res.status(200).json({
      quizName: result.quizName,
      message: "quiz created successfully",
      successful: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      successful: false,
    });
  }
};

export const getQuizData = async (req, res) => {
  try {
    const { quizName } = req.params;
    const data = await QuizSchema.findOne({ quizName });
    if (data === null) {
      return res.status(404).json({
        message: "No quiz found with name '" + quizName,
        successful: false,
      });
    }
    return res.status(200).json({ data, successful: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      successful: false,
    });
  }
};

export const addQuestionsViaCSV = async (req, res) => {
  try {
    const questions = req.body;
    const { quizId } = req.params;
    const quiz = await QuizSchema.findById(quizId);
    if (quiz === null) {
      return res
        .status(404)
        .json({ message: "No quiz found with id '" + quizId });
    }

    // * pushing the questions to the array in database
    for (let i = 0; i < questions.length; i++) {
      quiz.questions.push(questions[i]);
    }

    //* updating the quiz data
    const response = await QuizSchema.findByIdAndUpdate(quizId, quiz, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Questions added successfully", successful: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      successful: false,
    });
  }
};

export const addIndividualQuestion = async (req, res) => {
  try {
    const question = req.body;
    const { quizId } = req.params;

    const quiz = await QuizSchema.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
        successful: false,
      });
    }

    quiz.questions.push(question);

    await QuizSchema.findByIdAndUpdate(quizId, quiz, {
      new: true,
    });

    return res
      .status(200)
      .json({ message: "Questions added successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const getAllQuizes = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await TeacherSchema.findById(teacherId);
    if (teacher === null) {
      return res
        .status(404)
        .json({ message: "No Teahcer found", successful: false });
    }

    const quizDatas = teacher.createdQuiz;
    return res.status(200).json({ quizes: quizDatas, successful: true });
  } catch (error) {
    console.log("this is erro", error.message);
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { quizName } = req.params;
    const quiz = await QuizSchema.findOne({ quizName });
    if (quiz === null) {
      return res.status(404).json({
        message: 'No quiz found with name "' + quizName + ".",
        successful: false,
      });
    }
    return res.status(200).json({ quiz: quiz, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const editSingleQuestion = async (req, res) => {
  const { quizId } = req.params;
  const newQuestion = req.body;

  try {
    const quiz = await QuizSchema.findById(quizId);
    if (quiz === null) {
      return res
        .status(404)
        .json({ message: "No quiz found", successful: false });
    }

    const removeQuestionIndex = quiz.questions.findIndex(
      (q) => q.id === newQuestion.questionId
    );

    quiz.questions[removeQuestionIndex].remove();

    quiz.questions.push({
      question: newQuestion.question,
      options: newQuestion.options,
      correctOption: newQuestion.correctOption,
    });

    const response = await QuizSchema.findByIdAndUpdate(quizId, quiz, {
      new: true,
    });

    return res.status(200).json({
      quiz,
      message: "Questions Edited Successfully",
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const deleteSingleQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const quiz = await QuizSchema.findById(quizId);
    if (quiz === null) {
      return res
        .status(404)
        .json({ message: "No quiz found", successful: false });
    }

    const removeQuestionIndex = quiz.questions.findIndex(
      (q) => q.id === questionId
    );

    quiz.questions[removeQuestionIndex].remove();

    quiz.save();
    return res.status(200).json({
      quiz,
      message: "Questions Deleted Successfully",
      successful: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
