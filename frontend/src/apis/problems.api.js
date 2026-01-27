import axios from "axios";
const baseUrl=import.meta.env.VITE_BASE_URL

const API = axios.create({
  baseURL:baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProblems = async ()=>{
  try {
    const res = await axios.get(`${baseUrl}/problems/get-all`);
    return res.data.problems;
  }
  catch (err) {
    console.error("error while getting problems", err.message);
  }
}

export const getASingleProblem = async (problemId) => {
  try {
    const res = await axios.get(`${baseUrl}/problems/get/${problemId}`);
    return res.data;
  }
  catch (err) {
    console.error("error while getting the problem", err.message);
  }
}

export const getAsingleProblemStats = async (problemId) => {
  try {
    const res = await axios.post(
      `${baseUrl}/submission/count-question-stats`,
      {
        problemId,
      }
    );
    return res.data;
  } catch (err) {
    console.log("error while getting problem stats", err.message);
  }
};


export const getTestCases = async (problemId) => {
  try {
    const res = await axios.get(`${baseUrl}/testcase/get/${problemId}`);
    return res.data;
  }
  catch (err) {
    console.error("error while getting problem test case", err.message);
  }
};