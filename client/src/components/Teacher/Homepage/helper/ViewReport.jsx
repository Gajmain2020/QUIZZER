import {
  Alert,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllStudents,
  getStudentByFilter,
} from "../../../../service/student";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getTeacherDetails } from "../../../../service/teacher";
import Navbar from "../../../Navbar/Navbar";

export default function ViewReport() {
  const navigate = useNavigate();
  const possibleSemester = ["", "1", "2", "3", "4", "5", "6", "7", "8"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("");
  const [URN, setURN] = useState("");
  const [semester, setSemester] = useState("");
  const { id } = JSON.parse(localStorage.getItem("token"));
  const [errorMessage, setErrorMessage] = useState("");
  const [call, setCall] = useState(false);

  function handleApplyFilterClick() {
    if (semester.length !== 0 && !(semester in possibleSemester)) {
      setErrorMessage("Semester should contain number from 1 to 8 only.");
      return;
    }
    if (section.length !== 0 && section !== "A" && section !== "B") {
      setErrorMessage("Section should contain either A or B.");
      return;
    }
    if (URN.length !== 0 && URN.length !== 12) {
      setErrorMessage("URN must contain 12 digits");
      return;
    }
    if (semester.length === 0 && section.length === 0 && URN.length === 0) {
      setCall(() => !call);
      return;
    }
    const searchData = { section, semester, URN };

    getTeacherDetails(id)
      .then((res) => getStudentByFilter(searchData, res.user.department))
      .then((res) => setData(() => res.result))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTeacherDetails(id)
      .then((res) => getAllStudents(res.user.department))
      .then((res) => {
        setLoading(false);
        setData(() => res.students);
      })
      .catch((error) => setErrorMessage(error.message));
  }, [id, call]);

  return (
    <>
      <Navbar userType={"teacher"} />
      <Container>
        {/* Search componenet */}
        <Box className="filter-components">
          <div className="home-btn">
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/teacher/homepage/${id}`)}
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
              label="Section"
              onChange={(e) => setSection(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Roll Number"
              onChange={(e) => setURN(e.target.value)}
            />
            <Button variant="contained" onClick={handleApplyFilterClick}>
              Apply Filter
            </Button>
          </div>
          <div className="response-message">{data.length} Entries Found!!</div>
        </Box>

        {/* Table componenet */}
        <Box className="student-table">
          {loading ? (
            <CircularProgress />
          ) : (
            <Table size="small">
              <TableHead sx={{ backgroundColor: "gray" }}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>URN</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>View Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: "#d4e4ff" }}>
                {data.map((student) => printRow(student))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Container>
    </>
  );

  function printRow(data) {
    function handleStudentClick(id) {
      navigate(`/teacher/view-report/student/${id}`);
    }
    return (
      <TableRow>
        <TableCell>{data.fullName}</TableCell>
        <TableCell>{data.email}</TableCell>
        <TableCell>{data.urn}</TableCell>
        <TableCell>{data.department}</TableCell>
        <TableCell>{data.semester}</TableCell>
        <TableCell>{data.section}</TableCell>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleStudentClick(data._id)}
          color="secondary"
        >
          View
          <VisibilityIcon fontSize="small" />
        </Button>
      </TableRow>
    );
  }
}
