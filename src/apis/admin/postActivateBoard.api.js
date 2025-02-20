import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postActivateBoard = async ({ boardId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.ADMIN_ACTIVE_BOARD, { boardId }),
  );

  return response.data.data;
};
