import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postAdminCategory = async ({ categoryName }) => {
  const response = await authApi.post(API_DOMAINS.ADMIN_CATEGORY, {
    categoryName,
  });
  return response.data.data;
};
