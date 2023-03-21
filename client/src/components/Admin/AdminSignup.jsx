import { useState } from "react";
import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import "./styles.css";
import { signupAdmin } from "../../service/admin";
import signupLogo from "../../images/sign-up.png";
import AdminNavbarHelper from "./AdminHelperNavbar";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
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
  const [admin, setAdmin] = useState(initialState);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (
      admin.fullName === "" ||
      admin.email === "" ||
      admin.password === "" ||
      admin.confirmPassword === "" ||
      admin.department === ""
    ) {
      setErrorMessage("* Marked can not be empty.");
      setProcessing(false);
      return;
    }
    if (admin.password.length < 8 || admin.password === "") {
      setErrorMessage("Password must contain 8 character.");
      setProcessing(false);
      return;
    }
    if (admin.password !== admin.confirmPassword) {
      setErrorMessage("Password and Confirm Password must be same.");
      setProcessing(false);
      return;
    }

    const token = await signupAdmin(admin);
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
    navigate(`/admin/homepage/${token.id}`);
  };
  function handleLoginClick() {
    navigate(`/login/admin`);
  }
  function handleClear(e) {
    setErrorMessage("");
    e.target.reset();
  }

  return (
    <>
      <AdminNavbarHelper />
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
            <label htmlFor="fullName">Full Name * </label>
            <input
              className="form-item"
              onChange={handleChange}
              name="fullName"
              id="fullName"
              type="text"
              required
              placeholder="Jone Miller"
            />
            <label htmlFor="email">Email *</label>
            <input
              className="form-item"
              onChange={handleChange}
              name="email"
              type="email"
              id="email"
              required
              placeholder="jone@mail.com"
            />
            <label htmlFor="password">Password *</label>
            <input
              className="form-item"
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              required
              placeholder="Password"
            />
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              className="form-item"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Confirm Password"
            />
            <select
              onChange={handleChange}
              className="form-item dropdown"
              name="department"
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
