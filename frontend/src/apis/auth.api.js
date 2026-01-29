import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL


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
    toast.loading("user logging.......");
    const res = await API.post("/user/signin", {
      email,
      password,
    });

    toast.dismiss();
   
    toast.success("user logged in successfull");
    return res.data; 
  } catch (error) {
    toast.error("user login failed");
    throw (
      error.response?.data ||
      new Error("Something went wrong while logging in")
    );
  }
};

export const signUpAPi = async ({username,password,email})=>{
  try {
    toast.loading("user registration in progress.....");
    const res = await API.post("/user/signup", {
      username,
      email,
      password
    })
    toast.dismiss();
    toast.success("user registration successfull");
    return res.data;
  }
  catch (error) {
    toast.error("error while user registration");
    throw (
       error.response?.data ||
      new Error("Something went wrong while sign  up")
    )
  }
}

export const getAllUser = async (token) => {
   try {
  //   console.log(token)
  //   if (!token) return;
    const res = await axios.get(`${baseUrl}/user/get/all/profile`, {
      headers: {
        Authorization:`Bearer ${token}`,
      }
    });
   
    toast.success("all user fetched successfully");
    return res.data;
  }
  catch (err) {
    toast.error("error while getting all user profile....");
    console.log('error while getting all user Profile.',err.message);
  }
}

