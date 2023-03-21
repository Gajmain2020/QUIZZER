import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../../../service/student";
import loginLogo from "../../../images/next.png";
import Navbar from "../../Navbar/Navbar";

export default function LoginStudent() {
  const navigate = useNavigate();
  const intialState = { email: "", password: "" };
  const [loginData, setLoginData] = useState(intialState);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleSignupClick() {
    navigate("/signup/student");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (loginData.email === "" || loginData.password === "") {
      setErrorMessage("* Marked can not be empty");
      setProcessing(false);
      return;
    }

    const token = await loginStudent(loginData);
    if (token.authorized === false) {
      navigate("/not-authorized-user");
      return;
    }
    if (!token.successful) {
      setErrorMessage(token.message);
      setProcessing(false);
      return;
    }
    setProcessing(false);

    localStorage.setItem(
      "token",
      JSON.stringify({
        id: token?.id,
        userType: token?.userType,
        token: token?.token,
        name: token?.name,
      })
    );
    navigate(`/${token.userType}/homepage/${token?.id}`);
  };

  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Navbar />
      <Paper
        elevation={6}
        className="signup-form-container"
        sx={{ backgroundColor: "#E5D1FA" }}
      >
        <form>
          <div className="form-container">
            <div className="form-heading">
              <img src={loginLogo} alt="SignUp Logo" width={60} /> Login Student
            </div>
            {errorMessage !== "" && (
              <Alert
                severity="error"
                onClose={() => {
                  setErrorMessage("");
                }}
              >
                {errorMessage}
              </Alert>
            )}

            <label htmlFor="email">Email *</label>
            <input
              onChange={handleChange}
              className="form-item"
              type="email"
              name="email"
              placeholder="Ex Jone@mail.com"
              id="email"
            />
            <label htmlFor="password">Password*</label>
            <input
              id="password"
              className="form-item"
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            {!processing ? (
              <Button
                onClick={handleSubmit}
                variant="contained"
                className="login-btn"
              >
                Login
              </Button>
            ) : (
              <Button variant="contained" disabled>
                <CircularProgress />
              </Button>
            )}
            <Button
              className="signup-btn"
              size="small"
              variant="text"
              onClick={handleSignupClick}
            >
              Don't Have Account! Create Now!
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
