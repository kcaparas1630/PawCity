// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'https://pawcity.onrender.com';

const loginUser = async (userData: { email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  };

export default loginUser;
