import axios from "axios";

export async function signupStudent(data) {
  const response = await axios({
    url: "http://localhost:5000/student/sign-up",
    method: "POST",
    data,
  });
  // .then(console.log("axios is working"));
  return response;
}
export async function signupTeacher(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/teacher/sign-up",
      method: "POST",
      data,
    });

    // console.log(response.status);
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}

export async function getStudentDetails(data) {
  try {
    const details = await axios({
      url: `http://localhost:5000/student/get-student-details/${data}`,
      method: "GET",
    });
    return details;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}
