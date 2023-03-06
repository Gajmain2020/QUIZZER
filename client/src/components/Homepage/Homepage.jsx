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

  const navigateToTeacher = () => {
    navigate("/teacher");
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
              onClick={navigateToTeacher}
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
              component={Link}
              to="/student"
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
        <Footer />
      </Grid>
    </>
  );
};

export default Homepage;
