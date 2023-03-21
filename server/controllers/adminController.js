import mongoose from "mongoose";
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
  //
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
  const { fullName, email, department, semester, section, urn } = req.body;
  try {
    const isExistingUserByEmail = await StudentSchema.findOne({ email });
    const isExistingUserByURN = await StudentSchema.findOne({ urn });
    if (isExistingUserByEmail || isExistingUserByURN) {
      return res.status(400).json({
        message: "This email or URN already exist",
        successful: false,
      });
    }
    const hashPassword = await bcrypt.hash(email, 10);
    await StudentSchema.create({
      fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      authorized: true,
      section,
      urn,
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

export const getUnauthorizedStudentInfo = async (req, res) => {
  const { department } = req.query;
  try {
    const students = await StudentSchema.find({
      department,
      authorized: false,
    });
    return res.status(200).json({ students, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const getUnauthorizedTeacherInfo = async (req, res) => {
  const { department } = req.query;
  try {
    const teachers = await TeacherSchema.find({
      department,
      authorized: false,
    });
    return res.status(200).json({ teachers, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const approveStudent = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const student = await StudentSchema.findByIdAndUpdate(id, {
      $set: { authorized: true },
    });
    student.save();

    return res.status(200).json({ student, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const rejectStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    await StudentSchema.findByIdAndDelete(id);

    return res.status(200).json({ successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const approveTeacher = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const teacher = await TeacherSchema.findByIdAndUpdate(id, {
      $set: { authorized: true },
    });
    teacher.save();

    return res.status(200).json({ teacher, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const rejectTeacher = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    await TeacherSchema.findByIdAndDelete(id);

    return res.status(200).json({ successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};

export const addStudentViaCSV = async (req, res) => {
  const studentArray = req.body;
  console.log(studentArray);
  var unsuccesfulData = [];
  var successfulData = [];
  try {
    for (let i = 0; i < studentArray.length; i++) {
      const { fullName, email, department, semester, section, urn } =
        studentArray[i];
      const isExistingUser = await StudentSchema.findOne({ email });
      if (isExistingUser) {
        unsuccesfulData.push({
          fullName,
          email,
          department,
          semester,
          section,
          urn,
        });
        continue;
      }
      const hashPassword = await bcrypt.hash(email, 10);
      const response = await StudentSchema.create({
        fullName,
        email,
        password: hashPassword,
        confirmPassword: hashPassword,
        authorized: true,
        section,
        semester,
        department,
        urn,
      });

      successfulData.push(response);
    }
    return res
      .status(200)
      .json({ data: { successfulData, unsuccesfulData }, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
export const addTeacherViaCSV = async (req, res) => {
  const teacherArray = req.body;
  var unsuccesfulData = [];
  var successfulData = [];
  try {
    for (let i = 0; i < teacherArray.length; i++) {
      const { fullName, email, department } = teacherArray[i];
      const isExistingUser = await TeacherSchema.findOne({ email });
      if (isExistingUser) {
        unsuccesfulData.push({
          fullName,
          email,
          department,
        });
        continue;
      }
      const hashPassword = await bcrypt.hash(email, 10);
      const response = await TeacherSchema.create({
        fullName,
        email,
        password: hashPassword,
        confirmPassword: hashPassword,
        authorized: true,
        department,
      });

      successfulData.push(response);
    }
    return res
      .status(200)
      .json({ data: { successfulData, unsuccesfulData }, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
};
