import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";

import { Routes, Route, useNavigate, redirect } from "react-router-dom";

import axios from "axios";
import "./appStyles.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignupStudent from "./components/Student/Signup/SignupStudent";
import StudentDashboard from "./components/Student/Dashboard/StudentDashboard";
import StudentHomepage from "./components/Student/Homepage/StudentHomepage";
import SignupTeacher from "./components/Teacher/Signup/SignupTeacher";

function Component() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // setUser(res);
  // <homepage user= {user}>
  // {...user}

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setIsLoading(false);
      setLoggedInUser(false);
      //is logged in false
      setIsLoggedIn(false);
      // redirect to login
      navigate("/login");
    } else {
      axios({
        url: "http://localhost:5000/verify-jwt",
        method: "post",
        data: JSON.parse(localStorage.getItem("token")),
      }).then((res) => {
        if (res.data.verified === false) {
          localStorage.clear();
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          setLoggedInUser(res.data.details);
        }
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <>Loading</>;
  }

  if (loggedInUser !== null) {
  }

  return (
    <Container maxWidth="lg" className="mainContainer">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<>helllo</>}>
            <Route path="teacher" element={<div>login teacher page</div>} />
            <Route path="student" element={<div>Login page student</div>} />
          </Route>
          <Route path="/signup">
            <Route path="teacher" element={<SignupTeacher />} />
            <Route path="student" element={<SignupStudent />} />
          </Route>
          <Route path="/student">
            <Route path="dashboard/:id" element={<StudentDashboard />} />
            <Route path="homepage/:id" element={<StudentHomepage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Container>
  );
}

export default Component;
