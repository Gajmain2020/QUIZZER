import axios from "axios";

export async function signupAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/sign-up",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function loginAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/login",
      method: "POST",
      data,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function addTeacherViaAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/addTeacherViaAdmin",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function addStudentViaAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/addStudentViaAdmin",
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAdminDetails(id) {
  try {
    const response = await axios({
      url: `http://localhost:5000/admin/getAdmin/${id}`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
