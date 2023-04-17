import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherDetails } from "../../../service/teacher";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

function TeacherDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (user.id === id) {
      getTeacherDetails(id).then(async (res) => {
        if (res.data.found === true) {
          setUserDetails(res.data);
        } else {
          setUserDetails(null);
        }
      });
    } else {
      alert("user is not logged in");
    }
  }, []);

  function handleUpdateClick() {
    alert("update button clicked");
  }
  function handleHomepageClick() {
    alert("homepage button clicked");
    navigate(`/teacher/homepage/${user.id}`);
  }

  return (
    <>
      <div className="dashboard">
        <Navbar userType={"teacher"} />

        <button onClick={handleUpdateClick}>Update Profile</button>
        <button onClick={handleHomepageClick}>Homepage</button>

        {userDetails !== null && (
          <div>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{userDetails.user.fullName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{userDetails.user.email}</td>
                </tr>

                <tr>
                  <td>Department</td>
                  <td>{userDetails.user.department}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}

export default TeacherDashboard;
