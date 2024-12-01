import axios from 'axios';
import RegisterFormData from '../Interface/RegisterForm';

const API_BASE_URL = 'https://pawcity.onrender.com';

const registerUser = async (userData: RegisterFormData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return response.data;
};

export default registerUser;
