import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const deleteAdminBoard = async ({ boardId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.ADMIN_BOARD_DETAIL, { boardId }),
  );
  return response.data.data;
};
