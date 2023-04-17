import axios from "axios";

const URL = "http://localhost:5000/";

const headers = {
  "Content-Type": "application/json",
  authorization: JSON.parse(localStorage?.getItem("token"))?.token
    ? `Bearer ${JSON.parse(localStorage?.getItem("token"))?.token}`
    : "",
};

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

export async function getAllStudents(department) {
  try {
    const response = await axios({
      url: `http://localhost:5000/student/get-students-in/${department}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getStudentByFilter(query, department) {
  try {
    const response = await axios({
      url: `http://localhost:5000/student/search?department=${department}&section=${query.section}&semester=${query.semester}&URN=${query.URN}`,
      method: "GET",
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllQuizesStudent(studentId) {
  try {
    const response = await axios({
      url: URL + `quiz/get-quizes-student/${studentId}`,
      method: "GET",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
