import mongoose from "mongoose";

const reqString = { type: String, required: true };

const adminSchema = mongoose.Schema({
  fullName: reqString,
  email: reqString,
  password: reqString,
  confirmPassword: reqString,
  department: reqString,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

var AdminSchema = mongoose.model("AdminSchema", adminSchema);
export default AdminSchema;
