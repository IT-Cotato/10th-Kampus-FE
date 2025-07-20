import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const getUserData = async () => {
  const response = await authApi.get(API_DOMAINS.USER);
  return response.data?.data;
};
