import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../service/admin";
import AdminHelperNavbar from "./AdminHelperNavbar";
import loginLogo from "../../images/admin-login.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [admin, setAdmin] = useState(initialState);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSignupClick = () => {
    navigate("/signup/admin");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (admin.email === "" || admin.password === "") {
      setErrorMessage("* Marked can not be empty");
      setProcessing(false);
      return;
    }
    const token = await loginAdmin(admin);
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

  return (
    <>
      <AdminHelperNavbar />
      <Paper
        elevation={6}
        className="signup-form-container"
        sx={{ backgroundColor: "#E5D1FA" }}
      >
        <form>
          <div className="form-container">
            <div className="form-heading">
              <img src={loginLogo} alt="SignUp Logo" width={60} /> Login Admin
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
            <label htmlFor="password">Password *</label>
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
