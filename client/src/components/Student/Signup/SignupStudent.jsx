import { useState } from "react";
import { signupStudent } from "../../../service/UserService";

import { Paper } from "@mui/material";

import "./styles.css";
import { useNavigate } from "react-router-dom";

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

  const [studentSignupData, setStudentSignupData] = useState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (studentSignupData.password !== studentSignupData.confirmPassword) {
      setErrorMessage("Password and Confirm Password must be same.");
    }
    if (studentSignupData.password.length < 8) {
      setErrorMessage("Password must contain 8 character.");
    }

    const token = await signupStudent(studentSignupData);
    localStorage.setItem(
      "token",
      JSON.stringify({
        token: token?.data?.token,
        id: token?.data?.id,
        userType: token?.data?.userType,
      })
    );

    navigate(`/student/homepage/${token.data.id}`);
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

  return (
    <>
      <Paper className="signup-form-container" elevation={6}>
        <form
          action="/student/sign-up"
          method="post"
          className="signup-form-items"
        >
          <div className="form-container">
            <p className="form-heading">
              <u>Sign-Up Student</u>
            </p>

            <input
              className="form-item"
              placeholder="Ex. Jone Doe"
              required
              onChange={handleChange}
              name="fullName"
            />
            <input
              className="form-item"
              placeholder="Ex. jone@mail.com"
              required
              onChange={handleChange}
              name="email"
              label="Email"
            />
            <input
              className="form-item"
              required
              placeholder="Password"
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
            />
            <input
              className="form-item"
              required
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
              onChange={handleChange}
            />
            {setErrorMessage !== "" && (
              <p className="error-warning">{errorMessage}</p>
            )}

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
              <option>Select Section</option>
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
            <button className="submit-btn" onClick={handleSubmit}>
              Sign - Up
            </button>
            <button className="reset-btn" onClick={handleClear} type="reset">
              Reset
            </button>
          </div>
        </form>
      </Paper>
    </>
  );
}
