import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getMyArticlesList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.GET_MY_POSTS, {
    params: { page },
  });
  return response.data.data;
};

export const getMyCommentsList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.GET_MY_COMMENTED_POST, {
    params: { page },
  });
  return response.data.data;
};
