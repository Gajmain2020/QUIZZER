import { AppBar, Toolbar, Button, Avatar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../images/appLogo.png";
import CustomMenu from "./CustomMenu";

import "./navbarStyles.css";

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("token")));
  var userId = null;
  if (user !== null) userId = user.id;

  const handleClickProfile = (e) => {
    alert("profile button is clicked");
    navigate(`/${user.userType}/dashboard/${userId}`);
  };

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

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

  function handleLogoClick() {
    if (userType === "admin") {
      navigate(`/admin/homepage/${user.id}`);
    }
    if (userType === "teacher") {
      navigate(`/teacher/homepage/${user.id}`);
    }
    if (userType === "student") {
      navigate(`/student/homepage/${user.id}`);
    } else {
      navigate("/");
    }
  }

  return (
    <div>
      <AppBar className="navbar">
        <Toolbar sx={{ backgroundColor: "#393e46" }}>
          <Button
            onClick={handleLogoClick}
            size="small"
            className="home-button"
          >
            <img src={appLogo} width="120" alt="LOGO" className="home-logo" />
          </Button>
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
                    to="/login/admin"
                    sx={{ color: "#fff" }}
                  >
                    Admin
                  </Button>
                </li>
              </ul>
            </div>
            <div className="user-navigation">
              {user !== null ? (
                <div className="logged-in-navigation">
                  <Button
                    sx={{ color: "white", display: "flex", gap: "20px" }}
                    onClick={handleClickProfile}
                  >
                    <Avatar alt="user?.result.name">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6">{user.name}</Typography>
                  </Button>

                  <Button
                    variant="contained"
                    className="logout"
                    color="secondary"
                    size="small"
                    sx={{ height: "40px" }}
                    onClick={handleLogout}
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
