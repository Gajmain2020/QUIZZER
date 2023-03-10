import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginTeacher } from "../../../service/teacher";
import loginLogo from "../../../images/next.png";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

export default function LoginTeacher() {
  const navigate = useNavigate();
  const intialState = { email: "", password: "" };
  const [loginData, setLoginData] = useState(intialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  function handleSignupClick() {
    navigate("/signup/teacher");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (loginData.email === "" || loginData.password === "") {
      setErrorMessage("* Marked can not be empty");
      setProcessing(false);
      return;
    }
    const token = await loginTeacher(loginData);
    // console.log(token.data.successful);
    if (!token.successful) {
      setErrorMessage(token.message);
      setProcessing(false);
      return;
    }

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

      <Paper elevation={6} className="signup-form-container">
        <form>
          <div className="form-container">
            <div className="form-heading">
              <img src={loginLogo} alt="SignUp Logo" width={60} /> Login Teacher
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

            <input
              onChange={handleChange}
              className="form-item"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="form-item  "
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
            <Button size="small" onClick={handleSignupClick}>
              Don't Have Account! Create One!
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
