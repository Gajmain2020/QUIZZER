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
    <div>
      this is the profile component
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      <div>{userData.urn}</div>
      <div>{userData.semester}</div>
      <div>{userData.section}</div>
      <div>{userData.department}</div>
    </div>
  );
}
