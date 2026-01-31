import axios from "axios";
import { toast } from "react-toastify";
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

export const getAllsubmissionOfUser = async ({token,page,limit}) => {
  try {
    toast.loading("fetching user submission");
    const res =await axios.get(`${baseUrl}/submission/get-all-user-submission?page=${page}&limit=${limit}`, {
      headers: {
        Authorization:`Bearer ${token}`
      }
    });
    toast.dismiss();
    toast.info("submission fetched successfully");
    return res.data;
  }
  catch (err) {
    toast.error("error while getting all user submission");
    console.log('error while getting all submission',err.message);
  }
}

export const getASingleSubmisiion = async (token,submissionId) => {
  try {
    toast.loading("submission is loading");
    const res = await axios.get(`${baseUrl}/submission/get-single-submission/${submissionId}`, {
      headers: {
           Authorization:`Bearer ${token}`
      }
    })
    toast.dismiss();
    toast.success("submission fetched successfully");
    return res.data.submission;
  }
  catch (err) {
    toast.error("error while getting a single submission");
    console.error("error while getting a single submission", err.message);
  }
}

export const setAProblem = async ({payload,token}) => {
  try {  
    const res = await axios.post(`${baseUrl}/problems/create`,payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    toast.success("problem created successfully!");
    return;
  }
  catch (err) {
    toast.error('error while creating a problem...');
    console.error("error while creating a problem", err.message);
  }
}

export const globalSearch = async(search) => {
  try {
    const res = await axios.get(`${baseUrl}/problems/search?q=${search}`);
    return res.data;
  }
  catch (err) {
    console.log("search query got failed", err.message);
  }
}

export const createTestCase = async ({payload,token}) => {
  try {
    const res = await axios.post(`${baseUrl}/testcase/create`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    toast.success("testCases created successfully");
    return;
  }
  catch (err) {
    toast.error("error while creating testCase");
    console.error("error while creating test cases", err.message);
  }
}

