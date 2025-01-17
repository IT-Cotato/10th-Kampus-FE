import axios from 'axios';
import { authApi } from '../axios-instance';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
export const postLogin = async () => {
  const { data } = await axios.post('dummy');
  return data;
};

export const getHealth = async (token) =>
  await authApi.get('/api/v1/api/auth/health', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });