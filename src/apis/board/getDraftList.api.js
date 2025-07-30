import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getDraftList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.POST_GET_DRAFTS, {
    params: { page },
  });
  return response.data.data;
};
