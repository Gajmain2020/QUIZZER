import { Alert, Button, CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addStudentViaAdmin,
  addTeacherViaAdmin,
  getAdminDetails,
} from "../../../service/admin";
import "animate.css";

export default function Helper({ prop }) {
  const initialState = {
    fullName: "",
    email: "",
    semester: "",
    section: "",
    urn: "",
  };
  const [adminToken, setAdminToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );
  const [adminData, setAdminData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [successfulTeacher, setSuccessfulTeacher] = useState(false);
  const [successfulStudent, setSuccessfulStudent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState(initialState);
  async function handleAddTeacher(e) {
    e.preventDefault();
    setProcessing(true);
    const teacher = {
      fullName: data.fullName,
      email: data.email,
      department: adminData.details.department,
    };
    if (teacher.fullName === "" || teacher.email === "") {
      setProcessing(false);
      setSuccessfulTeacher(false);
      setErrorMessage("* Marked can not be empty.");
      return;
    }

    const response = await addTeacherViaAdmin(teacher);
    if (!response.successful) {
      setSuccessfulTeacher(false);
      setErrorMessage(response.message);
      setProcessing(false);
      return;
    }
    if (response.successful) {
      setSuccessfulTeacher(true);
      setErrorMessage("");
    }
    setData({ fullName: "", email: "" });
    setProcessing(false);
  }
  async function handleAddStudent(e) {
    e.preventDefault();
    setProcessing(true);
    const student = {
      fullName: data.fullName,
      email: data.email,
      department: adminData.details.department,
      semester: data.semester,
      section: data.section,
      urn: data.urn,
    };
    console.log(student);
    if (
      student.fullName === "" ||
      student.email === "" ||
      student.department === "" ||
      student.section === "" ||
      student.semester === "" ||
      student.urn === ""
    ) {
      setProcessing(false);
      setSuccessfulStudent(false);
      setErrorMessage("* Marked can not be empty.");
      return;
    }

    const response = await addStudentViaAdmin(student);
    if (!response.successful) {
      setSuccessfulStudent(false);
      setErrorMessage(response.message);
      setProcessing(false);
      return;
    }
    if (response.successful) {
      setSuccessfulStudent(true);
      setErrorMessage("");
    }
    setData({ fullName: "", email: "" });
    setProcessing(false);
  }
  function handleChange(e) {
    setErrorMessage("");
    setSuccessfulTeacher(false);
    setSuccessfulStudent(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }
  function handleClear(e) {
    setErrorMessage("");
    setSuccessfulTeacher(false);
    setSuccessfulStudent(false);
    setData(initialState);
  }

  useEffect(() => {
    setSuccessfulTeacher(false);
    setSuccessfulStudent(false);
    const id = adminToken.id;
    getAdminDetails(id)
      .then((response) => setAdminData(response))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <>
      <Paper
        elevation={6}
        className="signup-form-container"
        sx={{ backgroundColor: "#E5D1FA" }}
      >
        <form>
          <div className="form-container">
            <div className="form-heading animate__animated animate__bounce">
              Add {prop === 1 ? "Individual Teacher" : "Individual Student"}
            </div>
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
            <label htmlFor="fullName">Name *</label>
            <input
              onChange={handleChange}
              className="form-item"
              type="text"
              name="fullName"
              placeholder="Ex. Jone Miller"
              id="fullName"
            />
            <label htmlFor="email">Email *</label>
            <input
              onChange={handleChange}
              className="form-item"
              type="email"
              name="email"
              placeholder="Ex. Jone@mail.com"
              id="email"
            />
            {prop === 2 && (
              <>
                <label htmlFor="urn">URN(University Roll Number) *</label>
                <input
                  onChange={handleChange}
                  className="form-item"
                  type="urn"
                  name="urn"
                  placeholder="112233445566"
                  id="urn"
                />
                <select
                  className="form-item dropdown"
                  placeholder="Select Semester"
                  name="semester"
                  onChange={handleChange}
                  id="semester"
                >
                  <option>Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>

                <select
                  onChange={handleChange}
                  className="form-item dropdown"
                  name="section"
                  id="section"
                >
                  <option>Select Section </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </>
            )}

            {prop === 1 &&
              (!processing ? (
                <Button
                  onClick={handleAddTeacher}
                  variant="contained"
                  className="login-btn"
                  size="large"
                >
                  Add Teacher
                </Button>
              ) : (
                <Button variant="contained" disabled>
                  <CircularProgress />
                </Button>
              ))}
            {successfulTeacher && (
              <Alert
                onClose={() => {
                  setSuccessfulTeacher(false);
                }}
              >
                Teacher Added Successfully
              </Alert>
            )}
            {prop === 2 &&
              (true ? (
                <Button
                  onClick={handleAddStudent}
                  variant="contained"
                  className="login-btn"
                  size="large"
                >
                  Add Student
                </Button>
              ) : (
                <Button variant="contained" disabled>
                  <CircularProgress />
                </Button>
              ))}
            {successfulStudent && (
              <Alert
                onClose={() => {
                  setSuccessfulTeacher(false);
                }}
              >
                Student Added Successfully
              </Alert>
            )}
            <Button
              variant="contained"
              size="small"
              onClick={handleClear}
              type="reset"
              sx={{ backgroundColor: "#ffc107" }}
              className="reset-btn"
            >
              Reset
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}
