import axios from "axios";
const URL = "http://localhost:5000/";

export async function createQuiz(data) {
  try {
    const response = await axios({
      url: URL + "quiz/create-quiz",
      method: "POST",
      data,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getQuizData(quizName) {
  try {
    const response = await axios({
      url: URL + `quiz/get-details/${quizName}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
