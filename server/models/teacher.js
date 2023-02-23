import mongoose from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const teacherSchema = mongoose.Schema({
  fullName: reqString,
  email: reqString,
  password: reqString,
  confirmPassword: reqString,
  department: reqString,
  createdTest: [String],
});

var TeacherSchema = mongoose.model("TeacherSchema", teacherSchema);
export default TeacherSchema;
