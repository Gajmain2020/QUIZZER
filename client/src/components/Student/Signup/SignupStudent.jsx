import { useState } from "react";
import { signupStudent } from "../../../service/student";

import { Alert, Button, CircularProgress, Paper } from "@mui/material";

import "./styles.css";

import signupLogo from "../../../images/sign-up.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

export default function SignupStudent() {
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    semester: "",
    section: "",
    department: "",
  };

  const navigate = useNavigate();

  // const [returnMessage, setReturnMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [processing, setProcessing] = useState(false);

  const [studentSignupData, setStudentSignupData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (
      studentSignupData.fullName === "" ||
      studentSignupData.email === "" ||
      studentSignupData.password === "" ||
      studentSignupData.confirmPassword === "" ||
      studentSignupData.semester === "" ||
      studentSignupData.section === "" ||
      studentSignupData.department === ""
    ) {
      setErrorMessage("* Marked can not be empty.");
      setProcessing(false);
      return;
    }
    if (
      studentSignupData.password.length < 8 ||
      studentSignupData.password === ""
    ) {
      setErrorMessage("Password must contain 8 character.");
      setProcessing(false);
      return;
    }
    if (studentSignupData.password !== studentSignupData.confirmPassword) {
      setErrorMessage("Password and Confirm Password must be same.");
      setProcessing(false);
      return;
    }
    const token = await signupStudent(studentSignupData);
    if (!token.successful) {
      setErrorMessage(token.message);
      setProcessing(false);
      return;
    }
    setProcessing(false);

    localStorage.setItem(
      "token",
      JSON.stringify({
        token: token?.token,
        id: token?.id,
        userType: token?.userType,
        name: token?.name,
      })
    );

    navigate(`/student/homepage/${token.id}`);
  };

  function handleClear(e) {
    setErrorMessage("");
    e.target.reset();
  }

  const handleChange = (e) => {
    setStudentSignupData({
      ...studentSignupData,
      [e.target.name]: e.target.value,
    });
  };
  function handleLoginClick() {
    navigate(`/login/student`);
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
              Student
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

            <label for="fullName">Full Name * </label>
            <input
              id="fullName"
              className="form-item"
              placeholder="Ex. Jone Miller"
              required
              onChange={handleChange}
              name="fullName"
            />
            <label htmlFor="email">Email *</label>
            <input
              className="form-item"
              placeholder="Ex. jone@mail.com"
              required
              onChange={handleChange}
              name="email"
              id="email"
              label="Email"
            />
            <label htmlFor="password">Password *</label>
            <input
              className="form-item"
              required
              placeholder="Password"
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirm Password *</label>
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
              className="form-item dropdown"
              placeholder="Select Semester"
              name="semester"
              onChange={handleChange}
              id="semester"
            >
              <option>Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <select
              onChange={handleChange}
              className="form-item dropdown"
              name="section"
              id="section"
            >
              <option>Select Section </option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

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
              <option value="CIVIL">CIVIL</option>
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
