import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getAdminCardnewsList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.ADMIN_CARDNEWS, {
    params: { page },
  });
  return response.data.data;
};
