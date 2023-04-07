import { Button, CircularProgress, Grid, ListItem, Paper } from "@mui/material";
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
  return (
    <>
      <Navbar />
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
          <div className="attempted-test">
            here a table should be there with all the possible test attempted by
            user of {studentId}
          </div>
        </Paper>
      </Container>
    </>
  );
}
