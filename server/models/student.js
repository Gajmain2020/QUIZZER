import mongoose from "mongoose";

const reqString = { type: String, required: true };

const studentSchema = mongoose.Schema({
  fullName: reqString,
  email: reqString,
  password: reqString,
  confirmPassword: reqString,
  semester: reqString,
  section: reqString,
  department: reqString,
  authorized: {
    type: Boolean,
    default: false,
  },
  attemptedTest: [
    {
      type: String,
      securedScore: Number,
      totalScore: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
export default mongoose.model("StudentSchema", studentSchema);
