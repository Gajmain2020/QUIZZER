import { useState } from "react";
import { signupTeacher } from "../../../service/UserService";

import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignupTeacher() {
  const navigate = useNavigate();
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  };

  // const [returnMessage, setReturnMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [teacherSignupData, setTeacherSignupData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disableSubmitButton) return;

    setDisableSubmitButton(true);
    if (teacherSignupData.password !== teacherSignupData.confirmPassword) {
      setErrorMessage("Password and Confirm Password must be same.");
    }
    if (teacherSignupData.password.length < 8) {
      setErrorMessage("Password must contain 8 character.");
    }
    const token = await signupTeacher(teacherSignupData);
    localStorage.setItem(
      "token",
      JSON.stringify({
        token: token?.data?.token,
        id: token?.data?.id,
        userType: token?.data?.userType,
      })
    );

    navigate(`/teacher/homepage/${token.data.id}`);
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

  return (
    <>
      <Paper
        className="signup-form-container"
        elevation={6}
        sx={{ backgroundColor: "#E5D1FA" }}
      >
        <form
          action="/student/sign-up"
          method="post"
          className="signup-form-items"
        >
          <div className="form-container">
            <p className="form-heading">
              <u>Sign-Up Teacher</u>
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
            <button
              // disabled={disableSubmitButton}
              className="submit-btn"
              onClick={handleSubmit}
            >
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
