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

export const deleteQuiz = async (req, res) => {
  try {
    const { quizName } = req.params;
    const quiz = await QuizSchema.findOne({ quizName });

    const creator = await TeacherSchema.findById(quiz.creator.creatorId);

    //* deleting the quiz from teacher instance
    const removeQuizIndex = creator.createdQuiz.findIndex(
      (q) => q.quizName === quizName
    );
    creator.createdQuiz[removeQuizIndex].remove();
    creator.save();

    //* Deleting the quiz from Quiz Collection
    await QuizSchema.findOneAndDelete({ quizName });

    return res
      .status(200)
      .json({ message: "Quiz deleted successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const getAllQuizForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentSchema.findById(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found", successful: false });
    }

    const quizes = await QuizSchema.find({
      department: student.department,
      semester: student.semester,
    });

    let sendQuizes = [];
    for (let i = 0; i < quizes.length; i++) {
      let pass = quizes[i].attemptedStudents.findIndex(
        (student) => student.studentId === studentId
      );
      sendQuizes.push({
        _id: quizes[i]._id,
        quizName: quizes[i].quizName,
        numberOfQuestions: quizes[i].questions.length,
        attemptable: pass === -1 ? true : false,
      });
    }
    // console.log(sendQuizes);

    return res.status(200).json({
      message: "Quizes successfully found",
      successful: true,
      quizes: sendQuizes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const attemptQuiz = async (req, res) => {
  try {
    const { quizName } = req.params;

    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const studentData = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    if (studentData.userType !== "student") {
      return res.status(401).json({
        message: "You ar not authorized to attempt test.",
        successful: false,
      });
    }

    const quiz = await QuizSchema.findOne({ quizName });
    const student = await StudentSchema.findById(studentData.id);

    student.attemptedQuiz.push({
      quizId: quiz._id,
      quizName: quiz.quizName,
      securedScore: 0,
      totalScore: quiz.questions.length,
    });
    quiz.attemptedStudents.push({
      studentId: student._id,
      studentName: student.fullName,
      semester: student.semester,
      securedScore: 0,
    });

    student.save();
    quiz.save();

    const questions = quiz.questions.map((ques) => {
      return {
        questionId: ques._id,
        question: ques.question,
        options: ques.options,
      };
    });

    let sendData = {
      quizName: quiz.quizName,
      numberOfQuestions: quiz.questions.length,
      questions,
    };

    return res.status(200).json({ quizData: sendData, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizName } = req.params;
    const { submittedOptions } = req.body;
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const studentData = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const quiz = await QuizSchema.findOne({ quizName });
    //! getting question from quiz and calculating score
    const { questions } = quiz;

    var score = 0;

    for (let i = 0; i < questions.length; i++) {
      const options = questions[i].options;
      if (options.indexOf(questions[i].correctOption) === submittedOptions[i]) {
        score = score + 1;
      }
    }
    const student = await StudentSchema.findById(studentData.id);
    const studentIndex = student.attemptedQuiz.findIndex(
      (quiz) => quiz.quizName === quizName
    );
    const quizIndex = quiz.attemptedStudents.findIndex(
      (student) => student.studentId === studentData.id
    );

    console.log("1st", quizIndex);

    quiz.attemptedStudents.splice(studentIndex, 1);
    student.attemptedQuiz.splice(quizIndex, 1);
    console.log("2nd", student.attemptQuiz);

    quiz.attemptedStudents.push({
      quizId: quiz._id,
      quizName: quiz.quizName,
      securedScore: score,
      totalScore: quiz.questions.length,
    });

    student.attemptedQuiz[studentIndex] = {
      quizId: quiz._id,
      quizName: quiz.quizName,
      securedScore: score,
      totalScore: quiz.questions.length,
    };

    quiz.save();
    student.save();
    console.log("3rd", student.attemptQuiz);

    return res.status(200).json({
      quiz,
      student,
      score,
      message: "done hai bhai",
      successful: true,
    });
  } catch (error) {
    console.log("yaha hu bhai");
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const viewAttemptedQuiz = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await StudentSchema.findById(studentId);
    return res
      .status(200)
      .json({ attemptedQuiz: student.attemptedQuiz, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
