import { useState } from "react";
import { Button, Container, Paper } from "@mui/material";
import AdminHelperNavbar from "./AdminHelperNavbar";
import CloseIcon from "@mui/icons-material/Close";
import "./adminStyles.css";
import Helper12 from "./HelperComponents/Helper_1_2";
import Helper34 from "./HelperComponents/Helper_3_4";

export default function AdminHomepage() {
  // const [singleTeacherAddClick, setSingleTeacherAddClick] = useState(false);
  // const [multipleTeacherClick, setMultipleTeacherClick] = useState(false);
  // const [singleStudentAddClick, setSingleStudentAddClick] = useState(false);
  // const [multipleStudentAddClick, setMultipleStudentAddClick] = useState(false);
  const [component, setComponent] = useState(<></>);
  const [hidden, setHidden] = useState(true);

  function handleIndividualTeacherAddClick() {
    setComponent(<Helper12 prop={1} />);
    setHidden(false);
  }
  function handleIndividualStudentAddClick() {
    setComponent(<Helper12 prop={2} />);
    setHidden(false);
  }
  function handleMultipleTeacherAddClick() {
    setComponent(<Helper34 prop={3} />);
    setHidden(false);
  }
  function handleMultipleStudentAddClick() {
    setComponent(<Helper34 prop={4} />);
    setHidden(false);
  }
  function handleCloseHelperClick() {
    setComponent(<></>);
    setHidden(true);
  }

  return (
    <>
      <Container>
        <AdminHelperNavbar />
        <div style={{ marginTop: "100px" }}>
          <div>Total Teacher in Department::</div>
          <div>Total Students in Department::</div>
        </div>
        <div className="admin-options-btn">
          <Button variant="contained" onClick={handleIndividualTeacherAddClick}>
            Add Individual Teacher
          </Button>

          <Button variant="contained" onClick={handleIndividualStudentAddClick}>
            Add Individual Student
          </Button>
          <Button variant="contained" onClick={handleMultipleTeacherAddClick}>
            Add Teacher Via Excel,CSV
          </Button>
          <Button variant="contained" onClick={handleMultipleStudentAddClick}>
            Add Student Via Excel,CSV
          </Button>
        </div>
        <div>
          <div>
            <Container>
              <button hidden={hidden} onClick={handleCloseHelperClick}>
                <CloseIcon />
              </button>
              {component}
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
}
