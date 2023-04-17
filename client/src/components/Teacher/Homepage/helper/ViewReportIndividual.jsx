import {
  Button,
  CircularProgress,
  Grid,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getStudentDetails } from "../../../../service/student";
import Navbar from "../../../Navbar/Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProfileComponent from "./ProfileComponent";

export default function ViewReportIndividual() {
  const navigate = useNavigate();
  console.log(useLocation());
  const studentId = useLocation().pathname.split("/")[4];
  const [studentDetails, setStudentDetails] = useState(null);
  useEffect(() => {
    getStudentDetails(studentId).then((res) =>
      setStudentDetails(() => res.user)
    );
  }, [studentId]);

  console.log(studentDetails);
  return (
    <>
      <Navbar userType={"teacher"} />
      <Container className="main-report-container">
        <Paper className="report-container" elevation={7}>
          <div className="back-btn">
            <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ margin: "10px 750px 10px 0" }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </Button>
          </div>

          <div className="profile-container">
            {studentDetails !== null ? (
              <ProfileComponent user={studentDetails} />
            ) : (
              <CircularProgress />
            )}
          </div>
          <div>
            {studentDetails == null ? (
              <CircularProgress />
            ) : studentDetails.attemptedQuiz.length === 0 ? (
              <>
                <div className="empty-prompt">
                  {studentDetails.fullName} have not attempted any quiz till
                  now!
                </div>
              </>
            ) : (
              <Table size="small">
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "600" }}>S. No.</TableCell>
                    <TableCell sx={{ fontWeight: "600" }}>Quiz Name</TableCell>
                    <TableCell sx={{ fontWeight: "600" }}>
                      Secured Score
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600" }}>
                      Total Score
                    </TableCell>
                  </TableRow>
                </TableHead>
                {studentDetails !== null && (
                  <TableBody sx={{ backgroundColor: "#d4e4ff" }}>
                    {studentDetails.attemptedQuiz.map((quiz, idx) =>
                      printRow(quiz, idx)
                    )}
                  </TableBody>
                )}
              </Table>
            )}
          </div>
        </Paper>
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
          {quiz.securedScore}
        </TableCell>
        <TableCell sx={{ border: "solid 1px black", borderStyle: "dotted" }}>
          {quiz.totalScore}
        </TableCell>
      </TableRow>
    );
  }
}
