import axios from "axios";

export async function signupTeacher(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/teacher/sign-up",
      method: "POST",
      data,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function loginTeacher(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/teacher/login",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getTeacherDetails(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/teacher/get-teacher-details/${data}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
