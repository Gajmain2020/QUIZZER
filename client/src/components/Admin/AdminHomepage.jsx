import { useState } from "react";
import { Button } from "@mui/material";
import AdminHelperNavbar from "./AdminHelperNavbar";
import CloseIcon from "@mui/icons-material/Close";
import "./adminStyles.css";

export default function AdminHomepage() {
  const [openIndividualTeacher, setOpenIndividualTeacher] = useState(false);

  function handleIndividualTeacherAddClick(e) {
    setOpenIndividualTeacher(!openIndividualTeacher);
  }

  return (
    <>
      <div>
        <AdminHelperNavbar />
        <div>
          <div>Total Teacher in Department::</div>
          <div>Total Students in Department::</div>
        </div>
        <div className="admin-options-btn">
          <Button variant="contained" onClick={handleIndividualTeacherAddClick}>
            Add Individual Teacher
          </Button>
          {openIndividualTeacher && (
            <div className="model-popup">
              <div>
                <button
                  className="model-popup-close-btn"
                  onClick={handleIndividualTeacherAddClick}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          )}

          <Button variant="contained">Add Teacher Via Excel,CSV </Button>
          <Button variant="contained">Add Individual Student </Button>
          <Button variant="contained">Add Student Via Excel,CSV </Button>
        </div>
      </div>
    </>
  );
}
