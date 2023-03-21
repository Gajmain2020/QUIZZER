import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export default function ShowTable({ receivedData, prop }) {
  const successfulUsers = receivedData.data.successfulData;
  const rejectedUsers = receivedData.data.unsuccesfulData;
  console.log(rejectedUsers);
  console.log(successfulUsers);
  return (
    <>
      <div className="hello">
        <u>
          {" "}
          Out of {successfulUsers.length + rejectedUsers.length} data from CSV
          file {successfulUsers.length} are successfully added and{" "}
          {rejectedUsers.length} are rejected.
        </u>
      </div>
      <div className="response-table">
        <div>
          <Table size="small" sx={{ outline: "solid 1px #4BB543" }}>
            <TableHead
              sx={{ backgroundColor: "#4BB543", fontWeight: "bolder" }}
            >
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                {prop === 2 && (
                  <>
                    <TableCell>Section</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>URN</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {successfulUsers.map((user) => (
                <TableRow>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  {prop === 2 && (
                    <>
                      <TableCell>{user.semester}</TableCell>
                      <TableCell>{user.section}</TableCell>
                      <TableCell>{user.urn}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table size="small" sx={{ outline: "solid 1px red" }}>
            <TableHead sx={{ backgroundColor: "#E21818" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                {prop === 2 && (
                  <>
                    <TableCell>Section</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>URN</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rejectedUsers.map((user) => (
                <TableRow>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  {prop === 2 && (
                    <>
                      <TableCell>{user.semester}</TableCell>
                      <TableCell>{user.section}</TableCell>
                      <TableCell>{user.urn}</TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
