import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const teacherSchema = mongoose.Schema({
  name: reqString,
  email: reqString,
  password: reqString,
  confirmPassword: reqString,
  department: reqString,
  createdText: [String],
});

var TeacherSchema = mongoose.model("TeacherSchema", teacherSchema);
export default TeacherSchema;
