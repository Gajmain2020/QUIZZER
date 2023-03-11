import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminSchema from "../models/admin.js";
import TeacherSchema from "../models/teacher.js";
import StudentSchema from "../models/student.js";

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
      return res
        .status(400)
        .json({ message: "User already exists", successful: false });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", successful: false });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        successful: false,
      });
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
    const token = jwt.sign(
      {
        userType: "admin",
        id: result._id,
        name: fullName,
      },
      "test",
      { expiresIn: "1h" }
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
        userType: "admin",
        name: fullName,
        successful: true,
      });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AdminSchema.findOne({ email });
    if (!result) {
      return res
        .status(400)
        .json({ message: "Invalid email or password.", successful: false });
    }
    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password.", successful: false });
    }

    const token = jwt.sign(
      {
        userType: "admin",
        id: result._id,
        name: result.fullName,
      },
      "test",
      { expiresIn: "1h" }
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
        successful: true,
        userType: "admin",
        name: result.fullName,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const getAdminDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await AdminSchema.findById(id);
    return res.status(200).json({ details, successful: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const addTeacherViaAdmin = async (req, res) => {
  const { fullName, email, department } = req.body;
  try {
    const isExistingUser = await TeacherSchema.findOne({ email });
    if (isExistingUser) {
      return res
        .status(400)
        .json({ message: "This email already exist", successful: false });
    }
    const hashPassword = await bcrypt.hash(email, 10);
    const result = await TeacherSchema.create({
      fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      authorized: true,
      department,
    });

    return res
      .status(200)
      .json({ message: "Teacher added Successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const addStudentViaAdmin = async (req, res) => {
  const { fullName, email, department, semester, section } = req.body;
  try {
    const isExistingUser = await StudentSchema.findOne({ email });
    if (isExistingUser) {
      return res
        .status(400)
        .json({ message: "This email already exist", successful: false });
    }
    const hashPassword = await bcrypt.hash(email, 10);
    const result = await StudentSchema.create({
      fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      authorized: true,
      section,
      semester,
      department,
    });

    return res
      .status(200)
      .json({ message: "Student added Successfully", successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
