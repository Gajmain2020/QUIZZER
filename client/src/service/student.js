import axios from "axios";

export async function signupStudent(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/student/sign-up",
      method: "POST",
      data,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}
export async function loginStudent(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/student/login",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getStudentDetails(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/student/get-student-details/${data}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
