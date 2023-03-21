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
  approveStudent,
  getAdminDetails,
  getUnauthorizedStudent,
  rejectStudent,
} from "../../../service/admin";
import AdminHelperNavbar from "../AdminHelperNavbar";

export default function AuthorizationComponent() {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState(JSON.parse(localStorage.getItem("token")));
  const [processing, setProcessing] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id !== null) {
      getAdminDetails(id.id)
        .then((res) => {
          return getUnauthorizedStudent(res.details.department).then((res) => {
            setStudents(res.students);
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [successful, id]);

  function handleApproveClick(id) {
    const studentId = { id };
    setProcessing(true);
    approveStudent(studentId)
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
    rejectStudent(studentId)
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
          <h1>Student Authentication Request</h1>
        </div>
        <div>
          {students.length === 0 ? (
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
                      Semester
                    </TableCell>
                    <TableCell className="table-header-item" align="left">
                      Section
                    </TableCell>
                    <TableCell className="table-header-item" align="left">
                      Depatment
                    </TableCell>
                    <TableCell className="table-header-item" align="left">
                      URN
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
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell
                        className="table-body-item"
                        component="th"
                        scope="row"
                      >
                        {student.fullName}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {student.email}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {student.semester}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {student.section}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {student.department}
                      </TableCell>
                      <TableCell className="table-body-item" align="left">
                        {student.urn}
                      </TableCell>
                      <TableCell
                        className="table-body-item add-remove-btn"
                        align="left"
                      >
                        <Button
                          disabled={processing}
                          onClick={() => handleApproveClick(student._id)}
                          value={student.id}
                          size="small"
                          color="success"
                          variant="contained"
                        >
                          <PersonAddAltOutlinedIcon />
                        </Button>
                        /
                        <Button
                          disabled={processing}
                          onClick={() => handleRejectClick(student._id)}
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
