import { Alert, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import Papa from "papaparse";
import { addStudentViaCSV, addTeacherViaCSV } from "../../../service/admin";
import ShowTable from "./ShowTable";
import { useNavigate } from "react-router-dom";

export default function Helper_3_4({ prop }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  function handleFileUpload(e) {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (res) {
        console.log(res);
        const columnArray = [];
        const valueArray = [];

        res.data.map((d) => {
          columnArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        setData(res.data);
        setDisableSubmitButton(() => false);
      },
    });
  }

  const handleSubmitClickStudent = async () => {
    if (data.length === 0) {
      setErrorMessage("* Marked can not be empty. / CSV file is empty.");
      return;
    }
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].name === "" ||
          data[i].department === "" ||
          data[i].section === "" ||
          data[i].semester === "" ||
          data[i].urn === ""
        ) {
          setErrorMessage("Some required field are empty in csv file.");
          return;
        }
      }
      const response = await addStudentViaCSV(data);
      setReceivedData(response);
    }
  };
  const handleSubmitClickTeacher = async () => {
    if (data.length === 0) {
      setErrorMessage("* Marked can not be empty. / CSV file is empty.");
      return;
    }
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].fullName === "" ||
          data[i].department === "" ||
          data[i].email === ""
        ) {
          setErrorMessage("Some required field are empty in csv file.");
          return;
        }
      }
      const response = await addTeacherViaCSV(data);

      setReceivedData(response);
      navigate(`#table`);
    }
  };

  return (
    <>
      <Paper elevation={6} className="backdrop-form">
        <form>
          <div className="form-container">
            <div className="form-heading">
              Upload CSV File For {prop === 1 ? "Teacher" : "Student"}
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
            <label htmlFor="file">CSV File *</label>
            <Button variant="contained">
              <input
                className="form-item"
                type="file"
                name="email"
                placeholder="Ex Jone@mail.com"
                id="file"
                onChange={handleFileUpload}
              />
            </Button>

            <Button
              variant="contained"
              disabled={disableSubmitButton}
              onClick={
                prop === 1 ? handleSubmitClickTeacher : handleSubmitClickStudent
              }
            >
              Submit CSV File
            </Button>
          </div>
        </form>
      </Paper>
      <div id="table">
        {receivedData !== null && receivedData.successful === true && (
          <Paper elevation={6}>
            <ShowTable prop={prop} receivedData={receivedData} />
          </Paper>
        )}
      </div>
    </>
  );
}
