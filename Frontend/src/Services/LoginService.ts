// src/services/api.ts
import axiosInstance from './axiosConfig';
import LoginCredentials from '../Interface/LoginForm';

const loginUser = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export default loginUser;
