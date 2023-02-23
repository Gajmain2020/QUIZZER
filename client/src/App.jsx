import React, { useEffect, useState } from "react";

import { Container } from "@mui/material";

import { Routes, Route } from "react-router-dom";

import axios from "axios";
import "./appStyles.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignupStudent from "./components/Student/Signup/SignupStudent";
import SignupTeacher from "./components/Teacher/Signup/SignupTeacher";

function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // setUser(res);
  // <homepage user= {user}>
  // {...user}

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
      axios({
        url: "http://localhost:5000/verify-jwt",
        method: "post",
        data: JSON.parse(localStorage.getItem("token")),
      }).then((res) => {
        setIsLoggedIn(res.data.verified);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <Container maxWidth="lg" className="mainContainer">
      <Navbar />
      <div className="body-container">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login">
            <Route path="teacher" element={<div>login teacher page</div>} />
            <Route path="student" element={<div>Login page student</div>} />
          </Route>
          <Route path="/signup">
            <Route path="teacher" element={<SignupTeacher />} />
            <Route path="student" element={<SignupStudent />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Container>
  );
}

export default Component;
