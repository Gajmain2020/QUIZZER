import { Button, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./homepageStyles.css";

import TeacherLogin from "../../images/TeacherLogin.png";
import StudentLogin from "../../images/StudentLogin.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Homepage = () => {
  const navigate = useNavigate();

  const navigateToTeacherLogin = () => {
    navigate("/login/teacher");
  };
  const navigateToStudentLogin = () => {
    navigate("/login/student");
  };

  return (
    <>
      <Navbar />
      <Grid className="grid-container" container spacing={1}>
        <Grid item lg={6} sm={12}>
          <div className="navigation-button">
            <Button
              variant="contained"
              className="button"
              onClick={navigateToTeacherLogin}
            >
              <img
                className="navigation-logo"
                src={TeacherLogin}
                alt="Teacher Logo"
              />
              Click For Teacher Page &#10151;
            </Button>
          </div>
        </Grid>
        <Grid item lg={6} sm={12}>
          <div className="navigation-button">
            <Button
              className="button"
              variant="contained"
              onClick={navigateToStudentLogin}
            >
              <img
                className="navigation-logo"
                src={StudentLogin}
                alt="Student Logo"
                width="50"
              />
              Click For Student Page &#10151;
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Homepage;
