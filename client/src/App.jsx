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

function Component() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return (
  //     <>
  //       <CircularProgress />
  //     </>
  //   );
  // }

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
          </Route>
          <Route path="/teacher">
            <Route path="dashboard/:id" exact element={<TeacherDashboard />} />
            <Route path="homepage/:id" exact element={<TeacherHomepage />} />
            <Route
              path=":id/view-all-students"
              exact
              element={<ViewAllStudents />}
            />
            <Route path=":id/view-report" exact element={<ViewReport />} />
            <Route
              path="view-report/student/:id"
              exact
              element={<ViewReportIndividual />}
            />
          </Route>
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
