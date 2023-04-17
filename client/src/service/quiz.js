import axios from "axios";
const URL = "http://localhost:5000/";

const headers = {
  "Content-Type": "application/json",
  authorization: JSON.parse(localStorage?.getItem("token"))?.token
    ? `Bearer ${JSON.parse(localStorage?.getItem("token"))?.token}`
    : "",
};

export async function createQuiz(data) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + "quiz/create-quiz",
      method: "POST",
      data,
      headers: headers,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function getQuizData(quizName) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/get-details/${quizName}`,
      method: "GET",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addQuestionsViaCSV(questionData, quizData) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/add-questions/${quizData._id}`,
      method: "POST",
      data: questionData,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addIndividualQuestion(question, quizData) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/add-individual-question/${quizData._id}`,
      method: "POST",
      data: question,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllQuizes(teacherId) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/get-quizes/${teacherId}`,
      method: "GET",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAllQuestions(quizName) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        authorized: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/get-all-questions/${quizName}`,
      method: "GET",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function editSingleQuestion(quizId, question) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        accessGrant: false,
      };
    }
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
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteSingleQuestion(quizId, questionId) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        accessGrant: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/delete-question/${quizId}/${questionId}`,
      method: "DELETE",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

export async function deleteQuiz(quizName) {
  console.log(quizName);
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        accessGrant: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/delete-quiz/${quizName}`,
      method: "DELETE",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.message;
  }
}

export async function getQuizDataForAttempt(quizName) {
  try {
    const response = await axios({
      url: URL + `quiz/attempt-quiz/${quizName}`,
      mtehod: "GET",
      headers: headers,
    });
    if (response.status === 401) {
      throw response;
    }

    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function submitQuiz(quizName, submittedOptions) {
  try {
    const response = await axios({
      url: URL + `quiz/submit-quiz/${quizName}`,
      method: "POST",
      data: { submittedOptions },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getAttemptedQuizData(studentId) {
  try {
    if (headers.authorization === null) {
      return {
        message: "You need to be logged in",
        successful: false,
        accessGrant: false,
      };
    }
    const response = await axios({
      url: URL + `quiz/view-report/${studentId}`,
      method: "GET",
      headers: headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
