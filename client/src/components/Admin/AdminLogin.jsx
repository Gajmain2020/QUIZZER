import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../service/admin";
export default function AdminLogin() {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [admin, setAdmin] = useState(initialState);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleAdminSignupClick = () => {
    alert("Signup clicked");
    navigate("/signup/admin");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginAdmin(admin);
    // console.log(token.data.successful);
    if (!token.data.successful) {
      alert(token.data.message);
      return;
    }

    localStorage.setItem(
      "token",
      JSON.stringify({
        id: token?.data.id,
        userType: token?.data?.userType,
        token: token?.data?.token,
        name: token?.data?.name,
      })
    );
    navigate(`/${token.data.userType}/homepage/${token?.data?.id}`);
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
