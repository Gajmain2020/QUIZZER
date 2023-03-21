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

export async function getUnauthorizedStudent(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/admin/unauthorized-student?department=${
        data || "none"
      }`,
      method: "GET",
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function getUnauthorizedTeacher(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/admin/unauthorized-teacher?department=${
        data || "none"
      }`,
      method: "GET",
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

export async function approveStudent(data) {
  try {
    await axios({
      url: `http://localhost:5000/admin/approve-student`,
      method: "PATCH",
      data,
    });
  } catch (error) {
    return error.response.data;
  }
}
export async function approveTeacher(data) {
  try {
    await axios({
      url: `http://localhost:5000/admin/approve-teacher`,
      method: "PATCH",
      data,
    });
  } catch (error) {
    return error.response.data;
  }
}
export async function rejectStudent(data) {
  try {
    await axios({
      url: `http://localhost:5000/admin/reject-student/${data.id}`,
      method: "DELETE",
    });
  } catch (error) {
    return error.response.data;
  }
}
export async function rejectTeacher(data) {
  try {
    await axios({
      url: `http://localhost:5000/admin/reject-teacher/${data.id}`,
      method: "DELETE",
    });
  } catch (error) {
    return error.response.data;
  }
}

export async function addStudentViaCSV(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/admin/add-student-via-csv`,
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function addTeacherViaCSV(data) {
  try {
    const response = await axios({
      url: `http://localhost:5000/admin/add-teacher-via-csv`,
      method: "POST",
      data,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
