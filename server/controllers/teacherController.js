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
      return res
        .status(400)
        .json({ message: "Email already exists.", successful: false });
    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Password and confirm password does not match.",
        successful: false,
      });

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
        expiresIn: "5h",
      }
    );
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        token,
        id: result._id,
        userType: "teacher",
        name: fullName,
        successful: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: error.message, successful: false });
  }
};

export async function loginTeacher(req, res) {
  const { email, password } = req.body;
  try {
    const result = await TeacherSchema.findOne({ email });
    if (!result) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", successful: false });
    }
    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", successful: false });
    }

    const token = jwt.sign(
      {
        userType: "teacher",
        id: result._id,
        name: result.fullName,
      },
      "test",
      { expiresIn: "5h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      token,
      id: result._id,
      successful: true,
      userType: "teacher",
      name: result.fullName,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", successful: false });
  }
}

export async function getTeacherDetails(req, res) {
  const { id } = req.params;
  try {
    const user = await TeacherSchema.findById(id);
    return res.status(200).json({ user, found: true });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Teacher Does Not Exists", successful: false });
  }
}
