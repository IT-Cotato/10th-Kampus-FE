import axios from 'axios';
import { authApi } from '../axios-instance';
import { ACCESS_TOKEN_KEY } from '@/constants/api';
export const postLogin = async () => {
  const { data } = await axios.post('dummy');
  return data;
};

export const getHealth = async () => {
  await authApi.get('/v1/api/auth/health')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    })
}