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

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // setUser(res);
  // <homepage user= {user}>
  // {...user}

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setIsLoading(false);
      setUser(null);
      setIsLoggedIn(false);
    } else {
      axios({
        url: "http://localhost:5000/verify-jwt",
        method: "post",
        data: JSON.parse(localStorage.getItem("token")),
      }).then((res) => {
        if (res.data.verified === false) {
          localStorage.clear();
          setIsLoggedIn(false);
          // navigate("/login");
        } else {
          setUser(res.data);
        }
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <Container maxWidth="lg" className="mainContainer">
      {/* <Navbar /> */}
      <div className="body-container">
        <Routes>
          <Route path="/" exact element={<Homepage />}></Route>
          <Route path="/login" exact element={<>helllo</>}>
            <Route
              path="teacher"
              exact
              element={<div>login teacher page</div>}
            />
            <Route
              path="student"
              exact
              element={<div>Login page student</div>}
            />
          </Route>
          <Route path="/signup">
            <Route path="teacher" exact element={<SignupTeacher />} />
            <Route path="student" exact element={<SignupStudent />} />
          </Route>
          <Route path="/student">
            <Route path="dashboard/:id" exact element={<StudentDashboard />} />
            <Route path="homepage/:id" exact element={<StudentHomepage />} />
          </Route>
        </Routes>
      </div>
      {/* <Footer /> */}
    </Container>
  );
}

export default Component;
