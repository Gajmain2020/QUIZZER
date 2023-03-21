import { useState } from "react";
import { signupTeacher } from "../../../service/teacher";

import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import signupLogo from "../../../images/sign-up.png";

import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

export default function SignupTeacher() {
  const navigate = useNavigate();
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [processing, setProcessing] = useState(false);

  const [teacherSignupData, setTeacherSignupData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (
      teacherSignupData.fullName === "" ||
      teacherSignupData.email === "" ||
      teacherSignupData.password === "" ||
      teacherSignupData.confirmPassword === "" ||
      teacherSignupData.semester === "" ||
      teacherSignupData.section === "" ||
      teacherSignupData.department === ""
    ) {
      setErrorMessage("* Marked can not be empty.");
      setProcessing(false);
      return;
    }
    if (teacherSignupData.password.length < 8) {
      setErrorMessage("Password must contain 8 character.");
      setProcessing(false);
      return;
    }
    if (teacherSignupData.password !== teacherSignupData.confirmPassword) {
      setErrorMessage("Password and Confirm Password must be same.");
      setProcessing(false);
      return;
    }
    const token = await signupTeacher(teacherSignupData);
    if (!token.successful) {
      setProcessing(false);
      setErrorMessage(token.message);
      return;
    }
    setProcessing(false);

    navigate(`/not-authorized-signup`);
  };

  function handleClear(e) {
    setErrorMessage("");
    e.target.reset();
  }

  const handleChange = (e) => {
    setTeacherSignupData({
      ...teacherSignupData,
      [e.target.name]: e.target.value,
    });
  };
  function handleLoginClick() {
    navigate("/login/teacher");
  }

  return (
    <>
      <Navbar />
      <Paper
        className="signup-form-container"
        elevation={6}
        sx={{ backgroundColor: "#E5D1FA" }}
      >
        <form>
          <div className="form-container">
            <div className="form-heading">
              <img src={signupLogo} alt="SignUp Logo" width={60} /> Sign-Up
              Teacher
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
            <label htmlFor="fullName">Full Name * </label>
            <input
              className="form-item"
              placeholder="Ex. Jone Doe"
              required
              onChange={handleChange}
              name="fullName"
              id="fullName"
            />
            <label htmlFor="email">Email * </label>
            <input
              className="form-item"
              placeholder="Ex. jone@mail.com"
              required
              onChange={handleChange}
              name="email"
              id="email"
            />
            <label htmlFor="password">Password * </label>
            <input
              className="form-item"
              required
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              label="Password"
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password * </label>
            <input
              className="form-item"
              required
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <select
              onChange={handleChange}
              className="form-item dropdown"
              name="department"
              id="department"
            >
              <option>Select Deparment</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
              <option value="IT">IT</option>
              <option value="ETC">ETC</option>
              <option value="EEE">EEE</option>
              <option value="CVIL">CVIL</option>
              <option value="EE">EE</option>
            </select>
            <p className="error-warning">* marked are compulsory.</p>
            {!processing ? (
              <Button variant="contained" size="large" onClick={handleSubmit}>
                Sign - Up
              </Button>
            ) : (
              <Button variant="contained" disabled>
                <CircularProgress />
              </Button>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={handleClear}
              type="reset"
              sx={{ backgroundColor: "#ffc107" }}
              className="reset-btn"
            >
              Reset
            </Button>
            <Button onClick={handleLoginClick} size="small">
              Already have an account.
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
