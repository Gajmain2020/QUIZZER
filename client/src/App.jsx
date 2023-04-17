import React, { useEffect, useState } from "react";

import { CircularProgress, Container } from "@mui/material";

import { Routes, Route, useNavigate } from "react-router-dom";

import axios from "axios";
import "./appStyles.css";
import Homepage from "./components/Homepage/Homepage";
import SignupStudent from "./components/Student/Signup/SignupStudent";
import StudentDashboard from "./components/Student/Dashboard/StudentDashboard";
import StudentHomepage from "./components/Student/Homepage/StudentHomepage";
import SignupTeacher from "./components/Teacher/Signup/SignupTeacher";
import TeacherDashboard from "./components/Teacher/Dashboard/TeacherDashboard";
import TeacherHomepage from "./components/Teacher/Homepage/TeacherHomepage";
import NotFound from "./components/NotFound/NotFound";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSignup from "./components/Admin/AdminSignup";
import AdminHomepage from "./components/Admin/AdminHomepage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import LoginStudent from "./components/Student/Login/LoginStudent";
import LoginTeacher from "./components/Teacher/Login/LoginTeacher";
import AuthorizationComponentStudent from "./components/Admin/Authorization/AuthorizationComponentStudent";
import AuthorizationComponentTeacher from "./components/Admin/Authorization/AuthorizationComponentTeacher";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import NotAuthorizedSignup from "./components/NotAuthorized/NotAuthorizedSignup";
import ViewAllStudents from "./components/Teacher/Homepage/helper/ViewAllStudents";
import ViewReport from "./components/Teacher/Homepage/helper/ViewReport";
import ViewReportIndividual from "./components/Teacher/Homepage/helper/ViewReportIndividual";
import CreateQuiz from "./components/Teacher/Homepage/helper/CreateQuiz";
import AddQuestion from "./components/Teacher/Homepage/helper/AddQuestion";
import ViewQuizes from "./components/Teacher/Homepage/helper/ViewQuizes";
import EditQuiz from "./components/Teacher/Homepage/helper/EditQuiz";
import ViewQuiz from "./components/Teacher/Homepage/helper/ViewQuiz";
import Test from "./components/Test";
import ViewQuizesStudent from "./components/Student/Homepage/Helper/ViewQuizesStudent";
import AttemptQuiz from "./components/Student/Homepage/Helper/AttemptQuiz";
import ViewReportStudent from "./components/Student/Homepage/Helper/ViewReportStudent";

function Component() {
  return (
    <Container maxWidth="lg" className="mainContainer">
      {/* <Navbar /> */}
      <div className="body-container">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/admin">
            <Route
              path=":id/student-queue"
              element={<AuthorizationComponentStudent />}
            />
            <Route
              path=":id/teacher-queue"
              element={<AuthorizationComponentTeacher />}
            />
            <Route path="homepage/:id" exact element={<AdminHomepage />} />
            <Route path="dashboard/:id" exact element={<AdminDashboard />} />
          </Route>
          <Route path="/login">
            <Route path="teacher" exact element={<LoginTeacher />} />
            <Route path="student" exact element={<LoginStudent />} />
            <Route path="admin" exact element={<AdminLogin />} />
          </Route>
          <Route path="/signup">
            <Route path="teacher" exact element={<SignupTeacher />} />
            <Route path="student" exact element={<SignupStudent />} />
            <Route path="admin" exact element={<AdminSignup />} />
          </Route>
          <Route path="/student">
            <Route path="dashboard/:id" exact element={<StudentDashboard />} />
            <Route path="homepage/:id" exact element={<StudentHomepage />} />
            <Route path=":id">
              <Route
                path="attempt-quiz"
                exact
                element={<ViewQuizesStudent />}
              />
              <Route path="view-report" exact element={<ViewReportStudent />} />
            </Route>
          </Route>
          <Route path="/teacher">
            <Route path="dashboard/:id" exact element={<TeacherDashboard />} />
            <Route path="homepage/:id" exact element={<TeacherHomepage />} />
            <Route path=":id">
              <Route
                path="view-all-students"
                exact
                element={<ViewAllStudents />}
              />
              <Route path="view-report" exact element={<ViewReport />} />
              <Route path="create-quiz" exact element={<CreateQuiz />} />
              <Route path="view-quizes" exact element={<ViewQuizes />} />
            </Route>
            <Route
              path="view-report/student/:id"
              exact
              element={<ViewReportIndividual />}
            />
          </Route>
          <Route path="quiz">
            <Route
              path="attempt-quiz/:quizName"
              exact
              element={<AttemptQuiz />}
            />
            <Route
              path=":quizName/add-question"
              exact
              element={<AddQuestion />}
            />
            <Route path="view-quiz/:quizName" exact element={<ViewQuiz />} />
            <Route path="edit-quiz/:quizName" exact element={<EditQuiz />} />
          </Route>
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/not-authorized-user" element={<NotAuthorized />} />
          <Route
            path="/not-authorized-signup"
            element={<NotAuthorizedSignup />}
          />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Container>
  );
}

export default Component;
