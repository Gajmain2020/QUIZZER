import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editSingleQuestion, getAllQuestions } from "../../../../service/quiz";
import Navbar from "../../../Navbar/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import {
  Alert,
  Backdrop,
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
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export default function EditQuiz() {
  const navigate = useNavigate();
  const locn = useLocation();

  const quizName = locn.pathname.split("/")[3];

  const [questionEdit, setQuestionEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = JSON.parse(localStorage.getItem("token"));
  const [quiz, setQuiz] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    getAllQuestions(quizName)
      .then((res) => {
        setQuiz(res.quiz);
        setLoading(false);
      })
      .catch((err) => setErrorMessage(err.message));
  }, [quizName]);

  function handleEditChange(e) {
    setQuestionEdit({ ...questionEdit, [e.target.name]: e.target.value });
    setErrorMessage("");
  }
  function handleCloseOpenEditForm() {
    setErrorMessage("");
    setOpenEditForm(false);
  }

  function handleToggle(question) {
    console.log("question", question);
    setQuestionEdit({
      questionId: question._id,
      question: question.question,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      correctOption: question.correctOption,
    });
    setOpenEditForm(() => !openEditForm);
    setErrorMessage("");
  }

  function handleApplyChangesClick() {
    if (
      questionEdit.correctOption !== questionEdit.option1 &&
      questionEdit.correctOption !== questionEdit.option2 &&
      questionEdit.correctOption !== questionEdit.option3 &&
      questionEdit.correctOption !== questionEdit.option4
    ) {
      setErrorMessage("Correct option should be one of the options.");
      return;
    }

    editSingleQuestion(quiz._id, questionEdit)
      .then((res) => console.log("this is result", res))
      .catch((err) => setErrorMessage(err.message));
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
                  <TableCell>Edit</TableCell>
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
      <TableRow key={question._id} sx={{ outline: "solid 0.5px black" }}>
        <TableCell>{question.question}</TableCell>
        <TableCell>{question.options[0]}</TableCell>
        <TableCell>{question.options[1]}</TableCell>
        <TableCell>{question.options[2]}</TableCell>
        <TableCell>{question.options[3]}</TableCell>
        <TableCell>{question.correctOption}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleToggle(question)}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Backdrop sx={{ color: "#fff" }} open={openEditForm}>
            {questionEdit !== null && (
              <>
                <div className="question-edit-backdrop">
                  <div className="close-question-edit-form ">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleCloseOpenEditForm}
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  </div>
                  <div>
                    <Paper className="question-edit-form-container">
                      <form>
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
                        <div>
                          <label>Question</label>
                          <TextField
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={questionEdit.question}
                            name="question"
                            onChange={handleEditChange}
                          />
                        </div>
                        <div className="question-edit-option-container">
                          <label>Options </label>
                          <div>
                            <TextField
                              variant="outlined"
                              value={questionEdit.option1}
                              name="option1"
                              onChange={handleEditChange}
                            />
                            <TextField
                              variant="outlined"
                              value={questionEdit.option2}
                              name="option2"
                              onChange={handleEditChange}
                            />
                            <TextField
                              variant="outlined"
                              value={questionEdit.option3}
                              name="option3"
                              onChange={handleEditChange}
                            />
                            <TextField
                              variant="outlined"
                              value={questionEdit.option4}
                              name="option4"
                              onChange={handleEditChange}
                            />
                          </div>
                        </div>
                        <div className="question-edit-correct-option-container">
                          <label htmlFor="correctOption">Correct Option</label>
                          <TextField
                            variant="outlined"
                            value={questionEdit.correctOption}
                            name="correctOption"
                            id="correctOption"
                            onChange={handleEditChange}
                          />
                        </div>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleApplyChangesClick}
                        >
                          Save Changes
                        </Button>
                      </form>
                    </Paper>
                  </div>
                </div>
              </>
            )}
          </Backdrop>
        </TableCell>
      </TableRow>
    );
  }
}
