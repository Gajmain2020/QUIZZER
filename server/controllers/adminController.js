import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminSchema from "../models/admin.js";

export const signupAdmin = async (req, res) => {
  const {
    fullName,
    email,
    registration,
    password,
    confirmPassword,
    department,
  } = req.body;

  try {
    const isUserExisting = await AdminSchema.findOne({ email });
    if (isUserExisting) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await AdminSchema.create({
      fullName,
      email,
      registration,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      department,
    });
    console.log(result);
    return res.status(200).json({ result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error admin controller me hai check it asap" });
  }
};
