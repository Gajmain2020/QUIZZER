import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentSchema = mongoose.Schema({
  name: reqString,
  email: reqString,
  password: reqString,
  confirmPassword: reqString,
  department: reqString,
  semSec: reqString,
  attemptedTest: [
    {
      type: String,
      securedScore: Number,
      totalScore: Number,
    },
  ],
});

var StudentSchema = mongoose.model("StudentSchema", studentSchema);
export default StudentSchema;
