import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  approveTeacher,
  getAdminDetails,
  getUnauthorizedTeacher,
  rejectTeacher,
} from "../../../service/admin";
import AdminHelperNavbar from "../AdminHelperNavbar";

export default function AuthorizationComponent() {
  const [teachers, setTeachers] = useState([]);
  const [id, setId] = useState(JSON.parse(localStorage.getItem("token")));
  const [processing, setProcessing] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id !== null) {
      getAdminDetails(id.id)
        .then((res) => {
          return getUnauthorizedTeacher(res.details.department).then((res) => {
            setTeachers(res.teachers);
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [successful, id]);
  // console.log(request[0]._id);

  function handleApproveClick(id) {
    const studentId = { id };
    setProcessing(true);
    approveTeacher(studentId)
      .then((res) => {
        setSuccessful((succ) => !succ);
        setProcessing(false);
      })
      .catch((error) => {
        setError(error.message);
        setProcessing(false);
      });
  }

  function handleRejectClick(id) {
    const studentId = { id };
    setProcessing(true);
    rejectTeacher(studentId)
      .then((res) => {
        setSuccessful((succ) => !succ);
        setProcessing(false);
      })
      .catch((err) => {
        setError(err.message);
        setProcessing(false);
      });
  }

  return (
    <>
      <AdminHelperNavbar />
      <Container className="table">
        <div className="table-heading">
          <h1>Teacher Authentication Request</h1>
        </div>
        <div>
          {teachers.length === 0 ? (
            <>zero size Table</>
          ) : (
            <div>
              <Table
                sx={{
                  minWidth: 650,
                }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell className="table-header-item">
                      Full Name
                    </TableCell>
                    <TableCell className="table-header-item" align="left">
                      Email
                    </TableCell>

                    <TableCell className="table-header-item" align="left">
                      Depatment
                    </TableCell>
                    <TableCell
                      className="table-header-item add-remove-btn"
                      align="left"
                    >
                      Aprove/Decline
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  className="table-body"
                  sx={{ backgroundColor: "#d4e4ff" }}
                >
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell
                        className="table-body-item"
                        component="th"
                        scope="row"
                      >
                        {teacher.fullName}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {teacher.email}
                      </TableCell>

                      <TableCell className="table-body-item" align="left">
                        {teacher.department}
                      </TableCell>
                      <TableCell
                        className="table-body-item add-remove-btn"
                        align="left"
                      >
                        <Button
                          disabled={processing}
                          onClick={() => handleApproveClick(teacher._id)}
                          size="small"
                          color="success"
                          variant="contained"
                        >
                          <PersonAddAltOutlinedIcon />
                        </Button>
                        /
                        <Button
                          disabled={processing}
                          onClick={() => handleRejectClick(teacher._id)}
                          size="small"
                          color="error"
                          variant="contained"
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
