import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//  importing Routes for different APIs
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost:27017/Proj1")
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running At :: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
