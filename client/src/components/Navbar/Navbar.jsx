import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import appLogo from "../../images/appLogo.png";
import CustomMenu from "./CustomMenu";

import "./navbarStyles.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const handleClickProfile = (e) => {
    alert("profile button is clicked");
  };

  const buttons = [
    {
      buttonText: "Login",
      options: [
        { path: "/login/teacher", optionText: "Teacher" },
        { path: "/login/student", optionText: "Student" },
      ],
      variant: "contained",
    },
    {
      buttonText: "Signup",
      options: [
        { path: "/signup/teacher", optionText: "Teacher" },
        { path: "/signup/student", optionText: "Student" },
      ],
    },
  ];

  return (
    <div>
      <AppBar className="navbar">
        <Toolbar sx={{ backgroundColor: "#393e46" }}>
          <Link to="/" className="home-button">
            <img src={appLogo} width="120" alt="LOGO" className="home-logo" />
          </Link>
          <div className="toolbar">
            <div className="navigation">
              <ul>
                <li>
                  <Button
                    component={Link}
                    className="navigation-button"
                    to="/contact-us"
                    sx={{ color: "#fff" }}
                  >
                    Contact Us
                  </Button>
                </li>
                <li>
                  <Button
                    component={Link}
                    className="navigation-button"
                    to="/about-us"
                    sx={{ color: "#fff" }}
                  >
                    About Us
                  </Button>
                </li>
                <li>
                  <Button
                    component={Link}
                    className="navigation-button"
                    to="/admin"
                    sx={{ color: "#fff" }}
                  >
                    Admin
                  </Button>
                </li>
              </ul>
            </div>
            <div className="user-navigation">
              {loggedIn ? (
                <div className="logged-in-navigation">
                  <Avatar alt="user?.result.name">{user?.result.name}</Avatar>
                  <Button sx={{ color: "white" }} onClick={handleClickProfile}>
                    <Typography variant="h6">{user?.result.name}</Typography>
                  </Button>

                  <Button
                    variant="contained"
                    className="logout"
                    color="secondary"
                    // onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <div className="login-signup">
                    {buttons.map((menu) => {
                      return <CustomMenu key={menu.buttonText} menu={menu} />;
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
