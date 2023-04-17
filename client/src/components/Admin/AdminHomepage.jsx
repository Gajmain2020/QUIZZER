import { useState } from "react";
import { Backdrop, Button, Container, Paper } from "@mui/material";
import AdminHelperNavbar from "./AdminHelperNavbar";
import CloseIcon from "@mui/icons-material/Close";
import "./adminStyles.css";
import Helper12 from "./HelperComponents/Helper_1_2";
import Helper34 from "./HelperComponents/Helper_3_4";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import img1 from "../../images/education.png";
import img2 from "../../images/student1.png";
import img3 from "../../images/csv.png";
import img4 from "../../images/collaborative.png";
import img5 from "../../images/authorization1.png";
import img6 from "../../images/authorization.png";

export default function AdminHomepage() {
  const navigate = useNavigate();
  const [id] = useState(JSON.parse(localStorage.getItem("token")));

  const { name } = JSON.parse(localStorage.getItem("token"));

  const [component, setComponent] = useState(<></>);
  const [hidden, setHidden] = useState(true);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  if (id === null) {
    return <NotFound />;
  }

  function handleIndividualTeacherAddClick() {
    setComponent(<Helper12 prop={1} />);
    setOpenBackdrop(true);
    setHidden(false);
  }
  function handleIndividualStudentAddClick() {
    setComponent(<Helper12 prop={2} />);
    setOpenBackdrop(true);
    setHidden(false);
  }
  function handleMultipleTeacherAddClick() {
    setComponent(<Helper34 prop={1} />);
    setOpenBackdrop(true);
    setHidden(false);
  }
  function handleMultipleStudentAddClick() {
    setComponent(<Helper34 prop={2} />);
    setOpenBackdrop(true);
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
    setOpenBackdrop(false);
    setHidden(true);
  }

  return (
    <>
      <AdminHelperNavbar />
      <Container className="admin-homepage">
        <Paper className="homepage-container" style={{ marginTop: "80px" }}>
          <div className="heading">Welcome {name} !!</div>
          <div className="admin-options-btn">
            <Button
              variant="contained"
              onClick={handleIndividualTeacherAddClick}
            >
              <img src={img1} width={50} alt="" />
              Add Individual Teacher
            </Button>

            <Button
              variant="contained"
              onClick={handleIndividualStudentAddClick}
            >
              <img src={img2} width={50} alt="" />
              Add Individual Student
            </Button>
          </div>
          <div className="admin-options-btn">
            <Button variant="contained" onClick={handleMultipleTeacherAddClick}>
              <img src={img3} width={50} alt="" />
              Add Teacher Via CSV File
            </Button>
            <Button variant="contained" onClick={handleMultipleStudentAddClick}>
              <img src={img4} width={50} alt="" />
              Add Student Via CSV File
            </Button>
          </div>
          <div className="admin-options-btn">
            <Button variant="contained" onClick={handleAuthorizeStudentClick}>
              <img src={img5} width={50} alt="" />
              Authorize Student
            </Button>
            <Button variant="contained" onClick={handleAuthorizeTeacherClick}>
              <img src={img6} width={50} alt="" />
              Authorize Teacher
            </Button>
          </div>
        </Paper>

        <div className="hello">
          <Backdrop
            sx={{ color: "#fff", zIndex: "1000", marginTop: "80px" }}
            className="admin-helper-backdrop"
            open={openBackdrop}
          >
            <Paper>
              <Button
                variant="contained"
                color="error"
                size="large"
                hidden={hidden}
                className="close-button"
                onClick={handleCloseHelperClick}
              >
                <CloseIcon />
              </Button>

              <div>{component}</div>
            </Paper>
          </Backdrop>
        </div>
      </Container>
    </>
  );
}
