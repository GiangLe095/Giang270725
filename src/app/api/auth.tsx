// src/api/auth.ts
import axios from 'axios';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';



// 🟢 API login
export const loginApi = (data: { username: string; password: string }) => {
  return axios.post('/api/login', data);
};

// 🟢 API register
export const registerApi = (data: { username: string; password: string; email: string }) => {
  return axios.post('/api/register', data);
};

// 🟢 API forgot password
export const forgotPasswordApi = (data: { email: string }) => {
  return axios.post('/api/forgot-password', data);
};
