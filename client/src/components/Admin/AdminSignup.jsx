import { useState } from "react";
import { Paper } from "@mui/material";
import "./styles.css";
import { signupAdmin } from "../../service/admin";
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
  const [admin, setAdmin] = useState(initialState);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signupAdmin(admin);
    console.log(token);
    navigate("/admin/dashboard");
  };

  return (
    <>
      <Paper className="signup-form-container" elevation={6}>
        <form className="signup-form-items">
          <h1>
            <u>Admin Signup</u>
          </h1>
          <div className="form-container">
            <input
              className="form-item"
              onChange={handleChange}
              name="fullName"
              type="text"
              required
              placeholder="Jone Miller"
            />
            <input
              className="form-item"
              onChange={handleChange}
              name="email"
              type="email"
              required
              placeholder="jone@mail.com"
            />
            <input
              className="form-item"
              onChange={handleChange}
              name="password"
              type="password"
              required
              placeholder="Password"
            />
            <input
              className="form-item"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
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
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </Paper>
    </>
  );
}
