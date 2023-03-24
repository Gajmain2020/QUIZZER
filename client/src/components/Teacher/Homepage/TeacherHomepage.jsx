import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

function TeacherHomepage() {
  const navigate = useNavigate();
  const [{ id }] = useState(JSON.parse(localStorage.getItem("token")));
  console.log(id);
  if (id === null) {
    navigate("/not-authorized-user");
    return;
  }
  function handleCreateTestClick() {
    alert("Create Test button clicked");
  }
  function handleViewAllStudentsClick() {
    navigate(`/teacher/${id}/view-all-students`);
  }
  function handleViewReportClick() {
    navigate(`/teacher/${id}/view-report`);
  }

  return (
    <>
      <Navbar />
      <Container className="admin-homepage">
        <div style={{ marginTop: "100px" }}>
          <div>Total Teacher in Department::</div>
          <div>Total Students in Department::</div>
        </div>
        <div className="admin-options-btn">
          <Button variant="contained" onClick={handleCreateTestClick}>
            Create Test
          </Button>
          <Button variant="contained" onClick={handleViewReportClick}>
            View Reports
          </Button>
          <Button variant="contained" onClick={handleViewAllStudentsClick}>
            See all student
          </Button>
        </div>
      </Container>
    </>
  );
}
export default TeacherHomepage;
