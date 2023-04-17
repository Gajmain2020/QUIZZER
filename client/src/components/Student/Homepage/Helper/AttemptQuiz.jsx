import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { getQuizDataForAttempt, submitQuiz } from "../../../../service/quiz";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import completeGIF from "../../../../images/success.png";
import HomeIcon from "@mui/icons-material/Home";
import QuizIcon from "@mui/icons-material/Quiz";

function AttemptQuiz() {
  const navigate = useNavigate();
  const quizName = useLocation().pathname.split("/")[3];
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [quizData, setQuizData] = useState({});
  const callAPI = useRef(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [returnData, setReturnData] = useState({});
  const [testComplete, setTestComplete] = useState(false);

  setTimeout(() => {
    setErrorMessage("");
  }, 5000);

  useEffect(() => {
    if (callAPI.current) {
      getQuizDataForAttempt(quizName)
        .then((res) => {
          setQuizData(() => res.quizData);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        });
      callAPI.current = false;
    }
  }, [quizName]);
  if (loading) {
    return (
      <>
        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <LinearProgress color="inherit" />
        </Box>
      </>
    );
  }

  function handleClick(index, idx) {
    const tempArray = [...selectedOptions];

    tempArray[index] = idx;

    setSelectedOptions(tempArray);
  }

  function resetQuestion(index) {
    if (selectedOptions[index] == undefined) {
      return;
    }

    const tempArray = [...selectedOptions];
    tempArray[index] = undefined;
    setSelectedOptions(tempArray);
  }
  function handleQuizSubmit() {
    setSubmitLoading(true);
    if (
      selectedOptions.length !== quizData.numberOfQuestions ||
      selectedOptions.length === 0
    ) {
      setErrorMessage("Please Attempt All Questions To Submit Quiz");
      setSubmitLoading(false);
      return;
    }
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] == undefined) {
        setErrorMessage("Please Attempt All Questions To Submit Quiz");
        setSubmitLoading(false);
        return;
      }
    }

    submitQuiz(quizName, selectedOptions)
      .then((res) => {
        setReturnData(res);
        setSubmitLoading(false);
        setTestComplete(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <Container className="attempt-quiz-container">
        <div className="end-button">
          <Button variant="contained" color="error">
            End Quiz
          </Button>
        </div>
        <Paper elevation={6} className="quiz-details">
          <span> Quiz Name : {quizData.quizName}</span>
          <span> Quiz Name : {quizData.numberOfQuestions}</span>
        </Paper>
        <Paper className="questions-container">
          {quizData.questions.map((question, index) => {
            return (
              <div key={question.questionId}>
                <div className="question">
                  <span className="serial-number">{index + 1}.</span>
                  &nbsp;&nbsp;
                  {question.question}
                </div>
                <ul className="option-list">
                  {/* make is responsive component */}
                  {question.options.map((option, idx) => {
                    return (
                      <li
                        className={`option ${
                          selectedOptions[index] === idx ? "selected" : ""
                        }`}
                        key={option}
                        onClick={() => handleClick(index, idx)}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
                <Button
                  className="reset-button"
                  size="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => resetQuestion(index)}
                >
                  CLEAR SELECTION
                </Button>
              </div>
            );
          })}
          <Button
            onClick={() => {
              handleQuizSubmit();
            }}
            variant="contained"
            color="success"
            size="large"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <CircularProgress />
            ) : (
              <>
                SUBMIT QUIZ &nbsp;&nbsp;
                <AssignmentTurnedInIcon />
              </>
            )}
          </Button>
        </Paper>
        <Snackbar open={errorMessage !== ""}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>

        {/* BACKDROP COMPONENT */}

        {testComplete && (
          <Backdrop sx={{ color: "#fff", zIndex: "1000" }} open={testComplete}>
            <>
              <Paper className="test-complete-dialog-box">
                <img
                  src={completeGIF}
                  className="success-gif"
                  alt="Test Completed"
                />
                <div className="dialog-box-message">
                  Congratulations, {returnData.student.fullName}!! Your{" "}
                  {returnData.quiz.quizName} quiz is now completed. We hope you
                  enjoyed the quiz and found it informative.{" "}
                  <span> Have a great day!</span>
                </div>
                <div className="dialog-box-score">
                  <center></center>
                  <h4>
                    <i>Quiz Details : </i>{" "}
                  </h4>
                  <p>
                    Quiz Name : <u>{returnData.quiz.quizName}</u>
                  </p>
                  <p>
                    Number Of Questions :{" "}
                    <u>{returnData.quiz.questions.length}</u>
                  </p>
                  <p>
                    Secured Score : <u>{returnData.score}</u>
                  </p>
                  <p>
                    Total Score : <u>{returnData.quiz.questions.length}</u>
                  </p>
                </div>
                <div style={{ width: "100%" }}>
                  <Button
                    sx={{ marginBottom: "6px" }}
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() =>
                      navigate(
                        `/student/${returnData.student._id}/attempt-quiz`
                      )
                    }
                  >
                    Go To quizes &nbsp;&nbsp; <QuizIcon />
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() =>
                      navigate(`/student/homepage/${returnData.student._id}`)
                    }
                  >
                    Go To Home &nbsp;&nbsp; <HomeIcon fontSize="small" />
                  </Button>
                </div>
              </Paper>
            </>
          </Backdrop>
        )}
      </Container>
    </>
  );
}

export default AttemptQuiz;
