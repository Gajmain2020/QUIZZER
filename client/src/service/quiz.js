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

export async function addQuestionsViaCSV(questionData, quizData) {
  try {
    const response = await axios({
      url: URL + `quiz/add-questions/${quizData._id}`,
      method: "POST",
      data: questionData,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addIndividualQuestion(question, quizData) {
  try {
    const response = await axios({
      url: URL + `quiz/add-individual-question/${quizData._id}`,
      method: "POST",
      data: question,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllQuizes(teacherId) {
  try {
    const response = await axios({
      url: URL + `quiz/get-quizes/${teacherId}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllQuestions(quizName) {
  try {
    const response = await axios({
      url: URL + `quiz/get-all-questions/${quizName}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function editSingleQuestion(quizId, question) {
  try {
    const newQuestion = {
      questionId: question.questionId,
      question: question.question,
      options: [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ],
      correctOption: question.correctOption,
    };
    const response = await axios({
      url: URL + `quiz/edit-quiz/${quizId}`,
      method: "POST",
      data: newQuestion,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
