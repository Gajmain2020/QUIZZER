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
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            Name
          </TableCell>
          <TableCell>{userData.name}</TableCell>
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            Semester
          </TableCell>
          <TableCell>{userData.semester}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            Email
          </TableCell>
          <TableCell>{userData.email}</TableCell>
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            Section
          </TableCell>
          <TableCell>{userData.section}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            URN(University Roll Number)
          </TableCell>
          <TableCell>{userData.urn}</TableCell>
          <TableCell sx={{ backgroundColor: "#322F3D", color: "white" }}>
            Department
          </TableCell>
          <TableCell>{userData.department}</TableCell>
        </TableRow>
      </TableHead>
    </Table>
    // <div>
    //   <div>{userData.name}</div>
    //   <div>{userData.email}</div>
    //   <div>{userData.urn}</div>
    //   <div>{userData.semester}</div>
    //   <div>{userData.section}</div>
    //   <div>{userData.department}</div>
    // </div>
  );
}
