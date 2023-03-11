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
  authorized: {
    type: Boolean,
    default: false,
  },
  department: reqString,
  createdTest: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

var TeacherSchema = mongoose.model("TeacherSchema", teacherSchema);
export default TeacherSchema;
