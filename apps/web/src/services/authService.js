import axios from "axios";

const API = "http://localhost:5000";

export const registerUser = (data) => {
  return axios.post(`${API}/auth/register`, data);
};

export const loginUser = (data) => {
  return axios.post(`${API}/auth/login`, data);
};