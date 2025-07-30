import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getPostDetail = async ({ postId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.POST_HANDLE, { postId }),
    {},
  );
  return response.data.data;
};
export const rePost = async ({ postId }) => {
  const response = await authApi.put(
    generateApiPath(API_DOMAINS.POST_HANDLE, { postId }),
    {},
  );
  return response.data.data;
};
export const deletePost = async ({ postId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.POST_HANDLE, { postId }),
    {},
  );
  return response.data.data;
};
