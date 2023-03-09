import axios from "axios";

export async function signupAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/sign-up",
      method: "POST",
      data,
    });

    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
}

export async function loginAdmin(data) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/login",
      method: "POST",
      data,
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}

export async function getAdminDetails(req, res) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/get-admin-details",
      method: "GET",
      data: req,
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    console.log(error.response.status);
  }
}
