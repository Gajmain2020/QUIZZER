import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import TeacherSchema from "../models/teacher.js";

export const homepage = async (req, res) => {
  res.send("Hello World! From Teacher Side");
};

export const signupTeacher = async (req, res) => {
  const { fullName, email, password, confirmPassword, department } = req.body;

  try {
    const isUserExisting = await TeacherSchema.findOne({ email });
    if (isUserExisting)
      return res.status(400).json({ message: "Email already exists." });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password and confirm password does not match." });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await TeacherSchema.create({
      fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      department,
    });
    const token = jwt.sign(
      {
        userType: "teacher",
        id: result._id,
        name: fullName,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
