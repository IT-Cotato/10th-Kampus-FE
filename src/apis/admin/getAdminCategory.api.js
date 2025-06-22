import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getAdminCategory = async () => {
  const response = await authApi.get(API_DOMAINS.ADMIN_CATEGORY);
  return response.data.data;
};
