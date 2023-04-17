import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../../../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllQuizesStudent } from "../../../../service/student";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import questionMark from "../../../../images/question-mark.png";
import { startQuiz } from "../../../../service/quiz";

export default function ViewQuizesStudent() {
  const navigate = useNavigate();
  const studentId = useLocation().pathname.split("/")[2];
  const [quizes, setQuizes] = useState([]);
  const [questionLoaded, setQuestionLoaded] = useState(false);
  const [openConfirmationDialogBox, setOpenConfirmationDialogBox] =
    useState(null);

  useEffect(() => {
    getAllQuizesStudent(studentId)
      .then((res) => {
        setQuizes(res.quizes);
        setQuestionLoaded(() => true);
      })
      .catch((err) => alert(err.message));
  }, [studentId, navigate]);

  function handleStartQuiz(quizName) {
    navigate(`/quiz/attempt-quiz/${quizName}`);
  }

  return (
    <>
      <Navbar userType={"student"} />

      <Container>
        <center>
          <Typography variant="h2">
            <u>Attempt Test</u>
          </Typography>
        </center>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#F7D060", borderRadius: "50px" }}>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell>Number Of Questions</TableCell>
              <TableCell>Attempt</TableCell>
            </TableRow>
          </TableHead>
          {questionLoaded === false ? (
            <CircularProgress />
          ) : (
            <>
              <TableBody>
                {questionLoaded &&
                  quizes.map((quiz, idx) => printRow(quiz, idx))}
              </TableBody>
            </>
          )}
        </Table>
        <Backdrop
          sx={{ color: "#fff", zIndex: "1000", marginTop: "80px" }}
          open={openConfirmationDialogBox !== null}
        >
          <>
            <div className="confirmation-backdrop">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpenConfirmationDialogBox(null);
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>

              <Paper className="confirmation-dialog-box">
                <img src={questionMark} alt="Confirmation " />
                <h2>Are You Sure ?</h2>
                <br />
                Are you ready to begin the quiz? Please note that once you start
                the quiz, you will not be able to pause or restart or attempt
                the quiz again. Make sure you have a stable internet connection
                and enough time to complete the quiz in one sitting. Are you
                sure you want to start?
                <ul className="quiz-details">
                  <li>
                    Quiz Name:{" "}
                    <b>
                      <u>{openConfirmationDialogBox?.quizName}</u>
                    </b>
                  </li>
                  <li>
                    Number Of Questions:{" "}
                    <b>
                      <u>{openConfirmationDialogBox?.numberOfQuestions}</u>
                    </b>
                  </li>
                </ul>
                <div className="attempt-btns">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenConfirmationDialogBox(null)}
                  >
                    Don't Start
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleStartQuiz(openConfirmationDialogBox.quizName)
                    }
                  >
                    Start
                  </Button>
                </div>
              </Paper>
            </div>
          </>
        </Backdrop>
      </Container>
    </>
  );

  function printRow(quiz, idx) {
    function handleOpenConfirmationClick(quiz) {
      setOpenConfirmationDialogBox(quiz);
    }

    return (
      <TableRow key={quiz._id} sx={{ backgroundColor: "#FEF2F4" }}>
        <TableCell>{idx + 1}</TableCell>
        <TableCell>{quiz.quizName}</TableCell>
        <TableCell>{quiz.numberOfQuestions}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            disabled={!quiz.attemptable}
            onClick={() => handleOpenConfirmationClick(quiz)}
            color="warning"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
