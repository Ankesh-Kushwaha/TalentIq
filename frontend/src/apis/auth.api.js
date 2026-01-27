import axios from "axios";
const baseUrl=import.meta.env.VITE_BASE_URL

const API = axios.create({
  baseURL:baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async ({ email, password }) => {
  try {
    const res = await API.post("/user/signin", {
      email,
      password,
    });
   
    alert("user sign in successfully");
    console.log(res.data);
    return res.data; 
  } catch (error) {
    throw (
      error.response?.data ||
      new Error("Something went wrong while logging in")
    );
  }
};

export const signUpAPi = async ({username,password,email})=>{
  try {
    const res = await API.post("/user/signup", {
      username,
      email,
      password
    })
    alert("user sign up successfully");
    return res.data;
  }
  catch (error) {
    throw (
       error.response?.data ||
      new Error("Something went wrong while sign  up")
    )
  }
}
