import { useLocation } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { getAttemptedQuizData } from "../../../../service/quiz";
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ViewReportStudent() {
  const studentId = useLocation().pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const callAPI = useRef(true);
  const [attemptedQuizData, setAttemptedQuizData] = useState([]);

  useEffect(() => {
    if (callAPI.current) {
      getAttemptedQuizData(studentId)
        .then((res) => {
          setAttemptedQuizData(() => res.attemptedQuiz);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        });
      callAPI.current = false;
    }
  }, [studentId]);
  if (loading) {
    return (
      <>
        <Box sx={{ width: "80%", margin: "0 auto" }}>
          <LinearProgress color="inherit" />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar userType={"student"} />

      <Container sx={{ marginTop: "80px", minHeight: "600px" }}>
        <div className="heading">Reports</div>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#F7D060", borderRadius: "50px" }}>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell>Number Of Questions</TableCell>
              <TableCell>Secured Score</TableCell>
              <TableCell>Total Score</TableCell>
            </TableRow>
          </TableHead>
          {loading === true ? (
            <CircularProgress />
          ) : (
            <>
              <TableBody>
                {attemptedQuizData.map((quiz, idx) => printRow(quiz, idx))}
              </TableBody>
            </>
          )}
        </Table>
      </Container>
    </>
  );

  function printRow(quiz, idx) {
    return (
      <TableRow
        className="table-row"
        key={quiz.quizId}
        sx={{ backgroundColor: "#FEF2F4" }}
      >
        <TableCell>{idx + 1}.</TableCell>
        <TableCell>{quiz.quizName}</TableCell>
        <TableCell>{quiz.totalScore}</TableCell>
        <TableCell>{quiz.securedScore}</TableCell>
        <TableCell>{quiz.totalScore}</TableCell>
      </TableRow>
    );
  }
}
