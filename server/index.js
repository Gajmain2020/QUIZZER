import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

//  importing Routes for different APIs
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";
import quizRoutes from "./routes/quiz.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/admin", adminRoutes);
app.use("/quiz", quizRoutes);

app.post("/verify-jwt", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, "test", (err, varifiedJwt) => {
    if (err) {
      return res.status(200).json({ verified: false });
      // return;
    } else {
      res.status(200).json({ verified: true, details: varifiedJwt });
    }
  });
});

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/Proj1")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running At :: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
