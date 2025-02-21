import axios from 'axios';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
export const postLogin = async () => {
  const { data } = await axios.post('dummy');
  return data;
};

export const getUserDetail = async () => {
  const response = await authApi.get(API_DOMAINS.USER);
  return { success: true, data: response.data?.data };
};
export const patchSignup = async (signupData) => {
  const response = await authApi.patch(API_DOMAINS.USER, {
    ...signupData,
    nationality: signupData.nationality.toUpperCase(), // 대문자만 보내야 함
    preferredLanguage: signupData.preferredLanguage.toUpperCase(), // 대문자만 보내야 함
  });
  return { success: true, data: response.data.data };
};

