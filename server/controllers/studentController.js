import bcrypt from "bcryptjs";
import StudentSchema from "../models/student.js";
import jwt from "jsonwebtoken";
import urlParser from "url-parser";

export const homepage = async (req, res) => {
  res.send("Hello World! From Student Side");
};

export async function signupStudent(req, res) {
  const {
    fullName,
    email,
    password,
    confirmPassword,
    semester,
    section,
    department,
  } = req.body;

  try {
    const isUserExisting = await StudentSchema.findOne({ email });
    if (isUserExisting)
      res.status(400).json({ message: "Email elready exists." });

    if (password !== confirmPassword)
      res.status(400).json({ message: "Password does not match." });

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await StudentSchema.create({
      fullName: fullName,
      email,
      password: hashPassword,
      confirmPassword: hashPassword,
      semester,
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

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({ token, id: result._id, userType: "student", name: fullName });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
}

export async function getStudentDetails(req, res) {
  const { id } = req.params;
  try {
    const user = await StudentSchema.findById(id);
    res.status(200).json({ user, found: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Student Does Not Exists", found: false });
  }
}
