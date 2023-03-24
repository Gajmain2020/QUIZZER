import { Grid, ListItem, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getStudentDetails } from "../../../../service/student";
import Navbar from "../../../Navbar/Navbar";
import ProfileComponent from "./ProfileComponent";

export default function ViewReportIndividual() {
  console.log(useLocation());
  const studentId = useLocation().pathname.split("/")[4];
  const [studentDetails, setStudentDetails] = useState(null);
  useEffect(() => {
    getStudentDetails(studentId).then((res) =>
      setStudentDetails(() => res.user)
    );
  }, []);
  return (
    <>
      <Navbar />
      <Container className="main-report-container">
        <Paper className="report-container" elevation={7}>
          <div className="profile-container">
            <ProfileComponent user={studentDetails} />
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
