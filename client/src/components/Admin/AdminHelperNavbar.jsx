import { AppBar, Toolbar, Button, Avatar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../images/appLogo.png";
import { getAdminDetails } from "../../service/admin";

// import "./navbarStyles.css";

const AdminHelperNavbar = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  var userId = null;
  if (userToken !== null) userId = userToken.id;

  const handleClickProfile = (e) => {
    alert("profile button is clicked");
    navigate(`/${userToken.userType}/dashboard/${userId}`);
  };

  function handleLoginButtonClick() {
    navigate("/login/admin");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUserToken(null);
    navigate("/login/admin");
  }

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
                    to="/login/teacher"
                    sx={{ color: "#fff" }}
                  >
                    Teacher
                  </Button>
                </li>
                <li>
                  <Button
                    component={Link}
                    className="navigation-button"
                    to="/login/student"
                    sx={{ color: "#fff" }}
                  >
                    Student
                  </Button>
                </li>
              </ul>
            </div>
            <div className="user-navigation">
              {userToken !== null ? (
                <div className="logged-in-navigation">
                  <Button sx={{ color: "white" }} onClick={handleClickProfile}>
                    <div className="user-profile-btn">
                      <Avatar alt="user?.result.name">
                        {userToken.name[0]}
                      </Avatar>
                      <Typography variant="h6">{userToken.name}</Typography>
                    </div>
                  </Button>

                  <Button
                    variant="contained"
                    className="logout"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    onClick={handleLoginButtonClick}
                    variant="contained"
                    size="small"
                  >
                    Login As Admin
                  </Button>
                </>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminHelperNavbar;
