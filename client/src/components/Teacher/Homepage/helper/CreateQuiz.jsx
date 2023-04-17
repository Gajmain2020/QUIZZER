import { Alert, Button, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../../../../service/quiz";
import { getTeacherDetails } from "../../../../service/teacher";
import Navbar from "../../../Navbar/Navbar";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const possibleSemesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [{ name, id }] = useState(JSON.parse(localStorage.getItem("token")));

  const [quizData, setQuizData] = useState({
    quizName: "",
    semester: "",
    creator: { name, id },
    department: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setErrorMessage("");
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  }

  async function handleCreateQuizClick() {
    if (!(quizData.semester in possibleSemesters)) {
      setErrorMessage("Semester must be between 1 and 8 ");
    }
    if (quizData.quizName === "" || quizData.semester === "") {
      setErrorMessage("* marked can not be empty.");
      return;
    }
    getTeacherDetails(id)
      .then((res) => {
        quizData.department = res.user.department;
        createQuiz(quizData).then((res) => {
          if (res.successful === false) {
            setErrorMessage(res.message);
            return;
          }
          navigate(`/quiz/${res.quizName}/add-question`);
        });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  }

  return (
    <>
      <Navbar userType={"teacher"} />
      <Container>
        <Paper elevation={6} className="create-quiz-container">
          <div className="form-heading" style={{ marginBottom: "0.5em" }}>
            Create Quiz
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
          <Paper elevation={6} className="create-quiz-form">
            <TextField
              placeholder="Ex. DSA01"
              label="Quiz Name"
              required
              onChange={handleChange}
              name="quizName"
            />

            <TextField
              placeholder="Ex. 4"
              label="Semester"
              required
              onChange={handleChange}
              name="semester"
            />
            <Button
              color="success"
              variant="contained"
              size="small"
              sx={{ height: "3.5em" }}
              onClick={handleCreateQuizClick}
            >
              Create Quiz
            </Button>
          </Paper>
        </Paper>
      </Container>
    </>
  );
}
