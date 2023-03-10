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

export async function getAdminDetails(req, res) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/get-admin-details",
      method: "GET",
      data: req,
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
