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
      return res
        .status(404)
        .json({ message: "No quiz found with name '" + quizName });
    }
    return res.status(200).json({ data, successful: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      successful: false,
    });
  }
};
