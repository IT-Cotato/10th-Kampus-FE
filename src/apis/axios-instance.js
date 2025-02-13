import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../constants/api';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = (url, params, options) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${accessToken}` },
    params: params,
    //그 외
    ...options,
  });
  return instance;
};

export const authApi = axiosInstance(BASE_URL);
