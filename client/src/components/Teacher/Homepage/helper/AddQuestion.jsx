import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuizData } from "../../../../service/quiz";
import Navbar from "../../../Navbar/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import Papa from "papaparse";

export default function AddQuestion() {
  const navigate = useNavigate();
  const locn = useLocation();
  const quizName = locn.pathname.split("/")[2];
  const [quizData, setQuizData] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [option, setOption] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [temp, setTemp] = useState({
    question: "",
    option: [],
    correctOption: "",
  });

  useEffect(() => {
    getQuizData(quizName).then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        return;
      }
      setQuizData(() => res.data);
      setQuizQuestions(() => res.data.questions);
      setLoading(() => false);
    });
  }, [quizName]);

  function handleFileUpload(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        const columnArray = [];
        const valueArray = [];

        res.data.map((d) => {
          columnArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        setQuestions(res.data);
        setDisableSubmitButton(() => false);
      },
    });
  }

  function handleSubmitCSV() {
    for (let i = 0; i < questions.length; i++) {
      setTemp({
        question: questions[i].Question,
        options: [
          questions[i].Option1,
          questions[i].Option2,
          questions[i].Option3,
          questions[i].Option4,
        ],
        correctOption: questions[i].CorrectOption,
      });
    }
    console.log(temp);
    //todo:
    //! display a table of quetions for all the questions...
    //! after that give user chance to submit all the questions...
  }

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
              onClick={() => navigate(`/teacher/homepage/{id}`)}
            >
              <HomeIcon />
            </Button>
          </div>
          <div className="quiz-details">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <p>
                  <u>Quiz Name</u> :: {quizData.quizName}
                </p>
                <p>
                  {" "}
                  <u> Semster</u> :: {quizData.semester}
                </p>
                <p>
                  <u>Creator Name</u> ::{" "}
                  {quizData.creator.creatorName.charAt(0).toUpperCase() +
                    quizData.creator.creatorName.slice(
                      1,
                      quizData.creator.creatorName.length
                    )}
                </p>
              </>
            )}
          </div>
        </Paper>
        <Paper className="question-addition-option">
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setOption(() => 1)}
          >
            Add Question Via CSV
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setOption(() => 2)}
          >
            Add Question Individually
          </Button>
        </Paper>
        {option === 1 ? (
          <>
            <Paper
              elevation={6}
              className="signup-form-container"
              sx={{ backgroundColor: "#ccd9ff" }}
            >
              <form>
                <div className="form-container">
                  <div className="form-heading">
                    Upload CSV File Of Questions
                  </div>
                  <div className="form-heading"></div>
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
                  <label htmlFor="file">CSV File *</label>
                  <Button variant="contained">
                    <input
                      className="form-item"
                      type="file"
                      id="file"
                      onChange={handleFileUpload}
                    />
                  </Button>

                  <Button
                    variant="contained"
                    disabled={disableSubmitButton}
                    onClick={handleSubmitCSV}
                  >
                    Submit CSV File
                  </Button>
                </div>
              </form>
            </Paper>
          </>
        ) : (
          option === 2 && <div className="model-element">HEllo world</div>
        )}
        <Paper className="questions-container">
          {quizQuestions.length === 0 && <>hello</>}
          {quizQuestions.map((question) => (
            <div>{displayQuestion(question)}</div>
          ))}
        </Paper>
      </Container>
    </>
  );

  function displayQuestion() {
    return <>hello world</>;
  }
}
