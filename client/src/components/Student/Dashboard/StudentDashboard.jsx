import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentDetails } from "../../../service/UserService";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("token"));
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getStudentDetails(id).then(async (res) => {
      if (res.data.found === true) {
        setUserDetails(res.data);
      } else {
        setUserDetails(null);
      }
    });
  }, []);

  console.log(userDetails);

  function handleUpdateClick() {
    alert("Update button clicked");
    console.log(`update button clicked`);
  }

  return (
    <>
      <div className="dashboard">
        <Navbar />
        <button className="update-btn" onClick={handleUpdateClick}>
          Update Profile
        </button>
        {userDetails !== null && (
          <div>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{userDetails.user.fullName}</td>
                </tr>
                <tr>
                  <td>Semester</td>
                  <td>{userDetails.user.semester}</td>
                </tr>
                <tr>
                  <td>Section</td>
                  <td>{userDetails.user.section}</td>
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
