import { API_DOMAINS } from '@/constants/api';
import { authApi } from '@/apis/axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const putBoardPost = async ({ postId, data }) => {
  const response = await authApi.put(
    generateApiPath(API_DOMAINS.POST_HANDLE, { postId }),
    data,
  );
  return response.data.data;
};
