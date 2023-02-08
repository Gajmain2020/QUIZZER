import React, { Component } from "react";

import { Container } from "@mui/material";

import { Routes, Route } from "react-router-dom";

import "./appStyles.css";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StudentLandingPage from "./components/Student/StudentLandingPage";
import TeacherLandingPage from "./components/Teacher/TeacherLandingPage";

class App extends Component {
  render() {
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
              <Route path="teacher" element={<div>Signup page teacher</div>} />
              <Route path="student" element={<div>Signup page teacher</div>} />
            </Route>
            <Route path="/student" element={<StudentLandingPage />} />
          </Routes>
        </div>
        <Footer />
      </Container>
    );
  }
}

export default App;
