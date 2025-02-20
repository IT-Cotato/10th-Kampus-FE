import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postInactivateBoard = async ({ boardId }) => {
  const response = await authApi.post(
      generateApiPath(API_DOMAINS.ADMIN_INACTIVE_BOARD, { boardId }),
    );

  return response.data.data;
};
