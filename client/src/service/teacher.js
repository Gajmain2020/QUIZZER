import axios from "axios";

export async function signupTeacher(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/teacher/sign-up",
      method: "POST",
      data,
    });

    return response;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}

export async function getTeacherDetails(data) {
  try {
    const details = await axios({
      url: `http://localhost:5000/teacher/get-teacher-details/${data}`,
      method: "GET",
    });
    return details;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}
