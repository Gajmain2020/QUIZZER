import React, { useEffect, useState } from "react";
import Navbar from "../../../Navbar/Navbar";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllQuestions } from "../../../../service/quiz";

export default function ViewQuiz() {
  const navigate = useNavigate();
  const locn = useLocation();

  const quizName = locn.pathname.split("/")[3];

  const [loading, setLoading] = useState(true);
  const { id } = JSON.parse(localStorage.getItem("token"));
  const [quiz, setQuiz] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllQuestions(quizName)
      .then((res) => {
        setQuiz(res.quiz);
        setLoading(false);
      })
      .catch((err) => setErrorMessage(err.message));
  }, [quizName]);

  return (
    <>
      <Navbar />
      <Container className="add-question-container" sx={{ marginTop: "100px" }}>
        <Paper className="quiz-details-container" elevation={6}>
          <div className="home-btn">
            <Button
              variant="contained"
              color="warning"
              sx={{ marginTop: "10px", marginLeft: "15px" }}
              onClick={() => navigate(`/teacher/homepage/${id}`)}
            >
              <HomeIcon />
            </Button>
          </div>
          <div className="quiz-details">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <div>
                  <p>
                    <u>Quiz Name</u> :: {quiz.quizName}
                  </p>
                  <p>
                    {" "}
                    <u> Semster</u> :: {quiz.semester}
                  </p>
                </div>
                <div>
                  <p>
                    <u>Creator Name</u> ::{" "}
                    {quiz.creator.creatorName.charAt(0).toUpperCase() +
                      quiz.creator.creatorName.slice(
                        1,
                        quiz.creator.creatorName.length
                      )}
                  </p>
                  <p>
                    <u>No. Of Questions</u> :: {quiz.questions.length}
                  </p>
                </div>
              </>
            )}
          </div>
        </Paper>
        <Box className="student-table">
          {loading ? (
            <CircularProgress />
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: "gray" }}>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Option1</TableCell>
                  <TableCell>Option2</TableCell>
                  <TableCell>Option3</TableCell>
                  <TableCell>Option4</TableCell>
                  <TableCell>Correct Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#d4e4ff" }}>
                {quiz.questions.map((question) => printRow(question))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Container>
    </>
  );
  function printRow(question) {
    return (
      <TableRow sx={{ outline: "solid 0.5px black" }}>
        <TableCell>{question.question}</TableCell>
        <TableCell>{question.options[0]}</TableCell>
        <TableCell>{question.options[1]}</TableCell>
        <TableCell>{question.options[2]}</TableCell>
        <TableCell>{question.options[3]}</TableCell>
        <TableCell>{question.correctOption}</TableCell>
      </TableRow>
    );
  }
}
