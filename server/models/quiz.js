import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
  quizName: { type: String, unique: true },
  semester: String,
  department: String,
  creator: { creatorName: String, creatorId: String },
  attemptedStudents: [
    { studentName: String, studentId: String, semester: String },
  ],
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

var QuizSchema = mongoose.model("QuizSchema", quizSchema);
export default QuizSchema;
