import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function ProfileComponent({ user }) {
  const userData = {
    name: user.fullName,
    email: user.email,
    urn: user.urn,
    semester: user.semester,
    section: user.section,
    department: user.department,
  };
  return (
    <Table size="small" sx={{ minWidth: "800px" }}>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              borderRadius: "30px",
              backgroundColor: "#2B3A55",
              color: "white",
            }}
          >
            Name
          </TableCell>
          <TableCell>{userData.name}</TableCell>
          <TableCell
            sx={{
              borderRadius: "30px",
              backgroundColor: "#2B3A55",
              color: "white",
            }}
          >
            Semester
          </TableCell>
          <TableCell>{userData.semester}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              borderRadius: "30px",
              backgroundColor: "#2B3A55",
              color: "white",
            }}
          >
            Email
          </TableCell>
          <TableCell>{userData.email}</TableCell>
          <TableCell
            sx={{
              borderRadius: "30px",
              backgroundColor: "#2B3A55",
              color: "white",
            }}
          >
            Section
          </TableCell>
          <TableCell>{userData.section}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            sx={{
              borderRadius: "30px",
              backgroundColor: "#2B3A55",
              color: "white",
            }}
          >
            URN(University Roll Number)
          </TableCell>
          <TableCell>{userData.urn}</TableCell>
          <TableCell
            sx={{
              backgroundColor: "#2B3A55",
              borderRadius: "30px",
              color: "white",
            }}
          >
            Department
          </TableCell>
          <TableCell>{userData.department}</TableCell>
        </TableRow>
      </TableHead>
    </Table>
  );
}
