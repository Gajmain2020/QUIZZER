import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  Paper,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addIndividualQuestion,
  addQuestionsViaCSV,
  getQuizData,
} from "../../../../service/quiz";
import Navbar from "../../../Navbar/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import Papa from "papaparse";

export default function AddQuestion() {
  const navigate = useNavigate();
  const locn = useLocation();
  const quizName = locn.pathname.split("/")[2];
  const formRef = useRef(null);
  const [quizData, setQuizData] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [option, setOption] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [rearrangeQuestions, setRearrangeQuestions] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSecondDialogBox, setOpenSecondDialogBox] = useState(false);
  const [individualQuestion, setIndividualQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });

  useEffect(() => {
    getQuizData(quizName).then((res) => {
      if (res.successful === false) {
        setErrorMessage(res.message);
        navigate(-1);
        return;
      }
      setQuizData(() => res.data);
      setQuizQuestions(() => res.data.questions);
      setLoading(() => false);
    });
  }, [quizName, navigate]);

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
        setOpenSecondDialogBox(true);
      },
    });
  }

  function handleSubmitCSV() {
    // setRearrangeQuestions(() => []);
    setDisableSubmitButton(() => true);
    for (let i = 0; i < questions.length; i++) {
      rearrangeQuestions.push({
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
  }

  async function handleAddQuestionViaCSV() {
    for (let i = 0; i < rearrangeQuestions.length; ++i) {
      console.log(rearrangeQuestions[i]);
      if (
        rearrangeQuestions[i].question === "" ||
        rearrangeQuestions[i].options[0] === "" ||
        rearrangeQuestions[i].options[1] === "" ||
        rearrangeQuestions[i].options[2] === "" ||
        rearrangeQuestions[i].options[3] === "" ||
        rearrangeQuestions[i].correctOption === ""
      ) {
        setErrorMessage("Some mandatory data is missing from the CSV file.");
        return;
      }
    }
    const response = await addQuestionsViaCSV(rearrangeQuestions, quizData);
    if (response.successful === false) {
      setErrorMessage(response.message);
    }
    setSuccessMessage(response.message);
    setRearrangeQuestions(() => []);
  }

  function handleChangeIndividualQuestion(e) {
    setErrorMessage("");
    setSuccessMessage("");
    setIndividualQuestion({
      ...individualQuestion,
      [e.target.name]: e.target.value,
    });
  }
  async function handleAddIndividualQestionClick() {
    if (
      individualQuestion.question === "" ||
      individualQuestion.option1 === "" ||
      individualQuestion.option2 === "" ||
      individualQuestion.option3 === "" ||
      individualQuestion.option4 === "" ||
      individualQuestion.correctOption === ""
    ) {
      setErrorMessage("* marked are mandatory.");
      return;
    }

    const question = {
      question: individualQuestion.question,
      options: [
        individualQuestion.option1,
        individualQuestion.option2,
        individualQuestion.option3,
        individualQuestion.option4,
      ],
      correctOption: individualQuestion.correctOption,
    };
    const result = await addIndividualQuestion(question, quizData);
    if (result.successful === false) {
      setErrorMessage(result.message);
    }
    setSuccessMessage(() => result.message);
    formRef.current.reset();
  }

  return (
    <>
      <Navbar userType={"teacher"} />

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
                  <u>Quiz Name</u>: {quizData.quizName}
                </p>
                <p>
                  {" "}
                  <u> Semster</u>: {quizData.semester}
                </p>
                <p>
                  <u>Creator Name</u>:{" "}
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
            onClick={() => {
              setOption(() => 1);
              setOpenBackdrop(true);
            }}
          >
            Add Question Via CSV
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              setOption(() => 2);
              setOpenBackdrop(true);
            }}
          >
            Add Question Individually
          </Button>
        </Paper>
        {option === 1 ? (
          <>
            <Backdrop
              className="flex"
              sx={{ color: "#fff", zIndex: "1000" }}
              open={openBackdrop}
            >
              <Paper
                elevation={6}
                // className="signup-form-container"
                sx={{ margin: "0", padding: "20px 50px" }}
              >
                <div className="close-question-edit-form ">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenBackdrop(false)}
                  >
                    Close
                  </Button>
                </div>

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
                    {successMessage !== "" && (
                      <Alert
                        severity="success"
                        onClose={() => {
                          setSuccessMessage("");
                        }}
                      >
                        {successMessage}
                      </Alert>
                    )}
                  </div>
                </form>
              </Paper>
            </Backdrop>
          </>
        ) : (
          option === 2 && (
            <Backdrop
              className="flex"
              maxWidth="xl"
              sx={{ color: "#fff", zIndex: "1000" }}
              open={openBackdrop}
            >
              <Paper
                elevation={6}
                // className="signup-form-container"
                sx={{ margin: "0", padding: "20px 50px" }}
              >
                <div className="close-question-edit-form ">
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => setOpenBackdrop(false)}
                  >
                    Close
                  </Button>
                </div>
                <p className="questions-heading">Add Individual Question</p>
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
                <form
                  ref={formRef}
                  className="individual-question-form-container"
                >
                  <div className="question-field">
                    <TextField
                      sx={{ width: "100%" }}
                      label="Question *"
                      name="question"
                      multiline
                      rows={4}
                      onChange={handleChangeIndividualQuestion}
                    />
                  </div>
                  <div className="option-field">
                    <div>
                      <TextField
                        label="Option 1 *"
                        name="option1"
                        onChange={handleChangeIndividualQuestion}
                      />
                      <TextField
                        label="Option 2 *"
                        name="option2"
                        onChange={handleChangeIndividualQuestion}
                      />
                    </div>
                    <div>
                      <TextField
                        label="Option 3 *"
                        name="option3"
                        onChange={handleChangeIndividualQuestion}
                      />
                      <TextField
                        label="Option 4 *"
                        name="option4"
                        onChange={handleChangeIndividualQuestion}
                      />
                    </div>
                  </div>
                  <div className="correct-option-field">
                    <TextField
                      sx={{ width: "100%" }}
                      label="Correct Option *"
                      name="correctOption"
                      onChange={handleChangeIndividualQuestion}
                    />
                  </div>
                  <Button
                    size="large"
                    variant="contained"
                    color="success"
                    onClick={handleAddIndividualQestionClick}
                  >
                    Add Question
                  </Button>
                  {successMessage !== "" && (
                    <Alert
                      severity="success"
                      onClose={() => {
                        setSuccessMessage("");
                      }}
                    >
                      {successMessage}
                    </Alert>
                  )}
                </form>
              </Paper>
            </Backdrop>
          )
        )}

        {rearrangeQuestions.length !== 0 && (
          <Dialog
            maxWidth="xl"
            className="hello"
            open={openSecondDialogBox}
            scroll="paper"
          >
            <div>
              <Button
                sx={{ position: "stickey", marginTop: "5px" }}
                fullWidth
                // size="small"
                color="error"
                variant="outlined"
                onClick={() => {
                  setOpenSecondDialogBox(() => false);
                }}
              >
                Close
              </Button>
            </div>
            <Paper className="questions-container">
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
              <p className="questions-heading">
                No of questions :: {rearrangeQuestions.length}
              </p>

              {rearrangeQuestions.length !== 0 &&
                rearrangeQuestions.map((question, index) => {
                  return (
                    <div key={index} className="question-container">
                      <div className="question">
                        {index + 1}
                        {".   "}
                        {question.question}
                      </div>
                      <div className="options">
                        <p>A. {question.options[0]} </p>
                        <p>B. {question.options[1]} </p>
                        <p>C. {question.options[2]} </p>
                        <p>D. {question.options[3]} </p>
                      </div>
                      <div className="correct-option">
                        Correct Option : {question.correctOption}
                      </div>
                    </div>
                  );
                })}
              <Button
                color="success"
                variant="contained"
                onClick={handleAddQuestionViaCSV}
              >
                Add Questions
              </Button>
            </Paper>
          </Dialog>
        )}
      </Container>
    </>
  );
}
