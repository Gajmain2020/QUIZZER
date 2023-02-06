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

import "./navbarStyles.css";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickProfile = (e) => {
    alert("profile button is clicked");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <div className="login-signup">
                  <div>
                    <Button
                      variant="contained"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="nav-button"
                    >
                      Login
                    </Button>
                    <Menu
                      className="drop-down"
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={handleClose}
                        className="nav-button"
                        component={Link}
                        to="login/teacher"
                      >
                        Teacher
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        className="nav-button"
                        to="login/student"
                      >
                        Student
                      </MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      className="nav-button"
                    >
                      SignUp
                    </Button>
                    <Menu
                      className="drop-down"
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        className="nav-button"
                        to="signup/teacher"
                      >
                        Teacher
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        className="nav-button"
                        to="signup/student"
                      >
                        Student
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
