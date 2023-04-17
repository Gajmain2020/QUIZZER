import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { Button, Container } from "@mui/material";
import reportPNG from "../../../images/analysis.png";
import testPNG from "../../../images/exam.png";

export default function Homepage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));

  function handleViewReportClick() {
    navigate(`/student/${user.id}/view-report`);
  }
  function handleAttemptQuizClick() {
    navigate(`/student/${user.id}/attempt-quiz`);
  }

  return (
    <>
      <Navbar userType={"student"} />
      <Container>
        <div className="student-option-btns">
          <Button variant="contained" onClick={handleAttemptQuizClick}>
            <img src={testPNG} alt="Test Icon" />
            Attempt Quiz
          </Button>
          <Button variant="contained" onClick={handleViewReportClick}>
            <img src={reportPNG} alt="REPORT ICON" />
            View Result
          </Button>
        </div>
      </Container>
    </>
  );
}
