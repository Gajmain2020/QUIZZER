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
      .json({ token, id: result._id, userType: "admin", name: fullName });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AdminSchema.findOne({ email });
    if (!result) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password does not match" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};
