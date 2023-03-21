import bcrypt from "bcryptjs";
import StudentSchema from "../models/student.js";
import jwt from "jsonwebtoken";

export async function signupStudent(req, res) {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    semester,
    urn,
    section,
    department,
  } = req.body;

  try {
    const isUserExistingByEmail = await StudentSchema.findOne({ email });
    const isUserExistingByUrn = await StudentSchema.findOne({ urn });
    if (isUserExistingByUrn || isUserExistingByEmail)
      return res
        .status(400)
        .json({ message: "Email or URN elready exists.", successful: false });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "Password does not match.", successful: false });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await StudentSchema.create({
      fullName: fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      semester,
      urn,
      section,
      department,
    });
    const token = jwt.sign(
      {
        userType: "student",
        id: result._id,
        name: fullName,
      },
      "test",
      {
        expiresIn: "1h",
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
        userType: "student",
        name: fullName,
        successful: true,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
}

export async function loginStudent(req, res) {
  const { email, password } = req.body;
  try {
    const result = await StudentSchema.findOne({ email });
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
        userType: "student",
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
        authorized: result.authorized,
        successful: true,
        userType: "student",
        name: result.fullName,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message, successful: false });
  }
}

export async function getStudentDetails(req, res) {
  const { id } = req.params;
  try {
    const user = await StudentSchema.findById(id);
    return res.status(200).json({ user, successful: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, successful: false });
  }
}
