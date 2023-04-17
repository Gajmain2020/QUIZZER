import React, { useState, useEffect } from "react";
import Navbar from "../../../Navbar/Navbar";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Table,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { deleteQuiz, getAllQuizes } from "../../../../service/quiz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ViewQuizes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const locn = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [semester, setSemester] = useState("");
  const [quizName, setQuizName] = useState("");
  const id = locn.pathname.split("/")[2]; //* getting id from the url without any delay..
  const [quizes, setQuizes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openSuccessMessage, setOpenSuccessMessage] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  setTimeout(() => {
    setSuccessMessage("");
  }, 2000);

  useEffect(() => {
    // ! need to find all the quizes for specific teacher id
    getAllQuizes(id)
      .then((res) => {
        setQuizes(() => res.quizes);
      })
      .catch((err) => setErrorMessage(err.message));
    setLoading(false);
    return;
  }, [id, refresh, navigate]);

  function handleApplyFilterClick() {
    console.log("semster:", semester);
    console.log("quizName:", quizName);
  }

  function handleEditClick(id) {
    navigate(`/quiz/edit-quiz/${id}`);
  }
  function handleDeleteClick(quizName) {
    deleteQuiz(quizName)
      .then((res) => {
        setSuccessMessage(res.message);
      })
      .catch((err) => setErrorMessage(err.message));

    setRefresh((prev) => !prev);
    setOpenSuccessMessage(true);
  }

  return (
    <>
      <Navbar userType={"teacher"} />
      <Container>
        <Box className="filter-components">
          <div className="home-btn">
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(-1)}
            >
              <HomeIcon />
            </Button>
          </div>
          <div className="filter-component">
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
          </div>
          <div className="filter-component">
            <TextField
              variant="outlined"
              label="Semester"
              onChange={(e) => setSemester(e.target.value)}
            />

            <TextField
              variant="outlined"
              label="Quiz Name"
              onChange={(e) => setQuizName(e.target.value)}
            />
            <Button variant="contained" onClick={handleApplyFilterClick}>
              Apply Filter
            </Button>
          </div>
        </Box>
        <Box className="student-table">
          {loading ? (
            <CircularProgress />
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: "gray" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>S. No.</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Quiz Name</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Semester</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Edit Or View</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Delete Quiz</TableCell>
                </TableRow>
              </TableHead>
              {!loading && (
                <TableBody sx={{ backgroundColor: "#d4e4ff" }}>
                  {quizes.map((quiz, idx) => printRow(quiz, idx))}
                </TableBody>
              )}
            </Table>
          )}
        </Box>
        {successMessage !== "" && (
          <Snackbar open={successMessage !== ""} autoHideDuration={2000}>
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMessage("");
              }}
            >
              {successMessage}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </>
  );

  function printRow(quiz, idx) {
    return (
      <TableRow key={quiz._id}>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          {idx + 1}
        </TableCell>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          {quiz.quizName}
        </TableCell>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          {quiz.semester}
        </TableCell>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={() => handleEditClick(quiz.quizName)}
          >
            <EditIcon fontSize="small" />
            &nbsp; &nbsp; OR &nbsp; &nbsp;
            <VisibilityIcon />
          </Button>
        </TableCell>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDeleteClick(quiz.quizName)}
          >
            <DeleteForeverIcon fontSize="small" />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}
