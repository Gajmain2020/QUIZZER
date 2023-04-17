import { Button, Container, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import img1 from "../../../images/book.png";
import img2 from "../../../images/confirm.png";
import img3 from "../../../images/results.png";
import img4 from "../../../images/analysis.png";
import img5 from "../../../images/audience.png";

function TeacherHomepage() {
  const navigate = useNavigate();
  const [{ id }] = useState(JSON.parse(localStorage.getItem("token")));
  console.log(id);
  if (id === null) {
    navigate("/not-authorized-user");
    return;
  }
  function handleCreateTestClick() {
    navigate(`/teacher/${id}/create-quiz`);
  }
  function handleViewAllStudentsClick() {
    navigate(`/teacher/${id}/view-all-students`);
  }
  function handleViewReportClick() {
    navigate(`/teacher/${id}/view-report`);
  }
  function handleViewReportByQuizClick() {
    alert("View Report button clicked // you need to work here");
  }
  function handleViewAllQuizes() {
    navigate(`/teacher/${id}/view-quizes`);
  }

  return (
    <>
      <Navbar userType={"teacher"} />

      <Container sx={{ paddingTop: "80px" }} className="admin-homepage">
        <Paper
          sx={{ backgroundColor: "#ECECEC" }}
          className="homepage-container"
        >
          <div className="heading">Welcome hello !!</div>

          <div className="admin-options-btn">
            <Button variant="contained" onClick={handleCreateTestClick}>
              <img src={img1} width={50} alt="" />
              Create Quiz
            </Button>
            <Button variant="contained" onClick={handleViewAllQuizes}>
              <img src={img2} width={50} alt="" />
              View all quizes
            </Button>
          </div>
          <div className="admin-options-btn">
            <Button variant="contained" onClick={handleViewReportClick}>
              <img src={img3} width={50} alt="" />
              View Reports (Student List)
            </Button>
            <Button variant="contained" onClick={handleViewReportByQuizClick}>
              <img src={img4} width={50} alt="" />
              View Reports (Quiz List)
            </Button>
          </div>
          <div className="admin-options-btn">
            <Button variant="contained" onClick={handleViewAllStudentsClick}>
              <img src={img5} width={50} alt="" />
              See all student
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
}
export default TeacherHomepage;
