import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
  quizName: { type: String, unique: true },
  semester: String,
  department: String,
  creator: { creatorName: String, creatorId: String },
  attemptedStudents: [
    {
      studentId: String,
      studentName: String,
      semester: String,
      securedScore: Number,
    },
  ],
  questions: [
    {
      question: String,
      options: [String],
      correctOption: String,
    },
  ],
});

var QuizSchema = mongoose.model("QuizSchema", quizSchema);
export default QuizSchema;
