import axios from "axios";

export async function signupAdmin(admin) {
  try {
    const response = await axios({
      url: "http://localhost:5000/admin/sign-up",
      method: "POST",
      data: admin,
    });

    return response;
  } catch (error) {
    return error.response;
  }
}
