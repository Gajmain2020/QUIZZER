import { useState } from "react";
import { Button, Container, Paper } from "@mui/material";
import AdminHelperNavbar from "./AdminHelperNavbar";
import CloseIcon from "@mui/icons-material/Close";
import "./adminStyles.css";
import Helper12 from "./HelperComponents/Helper_1_2";
import Helper34 from "./HelperComponents/Helper_3_4";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export default function AdminHomepage() {
  const navigate = useNavigate();
  const [id] = useState(JSON.parse(localStorage.getItem("token")));

  const [component, setComponent] = useState(<></>);
  const [hidden, setHidden] = useState(true);

  if (id === null) {
    return <NotFound />;
  }

  function handleIndividualTeacherAddClick() {
    setComponent(<Helper12 prop={1} />);
    setHidden(false);
  }
  function handleIndividualStudentAddClick() {
    setComponent(<Helper12 prop={2} />);
    setHidden(false);
  }
  function handleMultipleTeacherAddClick() {
    setComponent(<Helper34 prop={1} />);
    setHidden(false);
  }
  function handleMultipleStudentAddClick() {
    setComponent(<Helper34 prop={2} />);
    setHidden(false);
  }
  function handleAuthorizeStudentClick() {
    navigate(`/admin/${id}/student-queue`);
  }
  function handleAuthorizeTeacherClick() {
    navigate(`/admin/${id}/teacher-queue`);
  }
  function handleCloseHelperClick() {
    setComponent(<></>);
    setHidden(true);
  }

  return (
    <>
      <AdminHelperNavbar />
      <Container className="admin-homepage">
        <div>
          <div style={{ marginTop: "100px" }}>
            <div>Total Teacher in Department::</div>
            <div>Total Students in Department::</div>
          </div>
          <div className="admin-options-btn">
            <Button
              variant="contained"
              onClick={handleIndividualTeacherAddClick}
            >
              Add Individual Teacher
            </Button>

            <Button
              variant="contained"
              onClick={handleIndividualStudentAddClick}
            >
              Add Individual Student
            </Button>
            <Button variant="contained" onClick={handleMultipleTeacherAddClick}>
              Add Teacher Via CSV File
            </Button>
            <Button variant="contained" onClick={handleMultipleStudentAddClick}>
              Add Student Via CSV File
            </Button>
            <Button variant="contained" onClick={handleAuthorizeStudentClick}>
              Authorize Student
            </Button>
            <Button variant="contained" onClick={handleAuthorizeTeacherClick}>
              Authorize Teacher
            </Button>
          </div>
        </div>

        <button hidden={hidden} onClick={handleCloseHelperClick}>
          <CloseIcon />
        </button>
        <div className="model-element">{component}</div>
      </Container>
    </>
  );
}
