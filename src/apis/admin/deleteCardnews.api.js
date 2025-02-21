import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const deleteCardnews = async ({ postId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.ADMIN_CARDNEWS_DETAIL, { postId }),
  );
  return response.data.data;
};
