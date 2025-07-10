import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const deleteComment = async ({ commentId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.COMMENT_DELETE, { commentId }),
  );
  return response.data.data;
};
