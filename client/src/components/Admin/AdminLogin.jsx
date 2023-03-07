import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
    error: "",
  };
  const [admin, setAdmin] = useState(initialState);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleAdminSignupClick = () => {
    alert("Signup clicked");
    navigate("/signup/admin");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(admin);
    alert(admin);
  };

  return (
    <>
      <div className="admin-page">
        <h1>
          <u>Admin Login</u>
        </h1>
        <form>
          <div className="form-container">
            <input
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
            />
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
            <button onClick={handleSubmit}>Login</button>
            <button onClick={handleAdminSignupClick}>
              Don't have an admin account go to create admin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
