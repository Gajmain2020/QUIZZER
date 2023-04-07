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
    navigate(`/teacher/${id}/create-quiz`);
  }
  function handleViewAllStudentsClick() {
    navigate(`/teacher/${id}/view-all-students`);
  }
  function handleViewReportClick() {
    navigate(`/teacher/${id}/view-report`);
  }
  function handleViewReportByQuizClick() {
    alert("View Report button clicked");
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
            View Reports (Student List)
          </Button>
          <Button variant="contained" onClick={handleViewReportByQuizClick}>
            View Reports (Quiz List)
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
