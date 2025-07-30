import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const addPostLike = async ({ postId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.POST_LIKE_TOGGLE, { postId }),
  );
  return response.data.data;
};
export const deletePostLike = async ({ postId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.POST_LIKE_TOGGLE, { postId }),
  );
  return response.data.data;
};
