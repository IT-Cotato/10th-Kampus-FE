import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const getAdminBoardDetail = async ({ boardId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.ADMIN_BOARD_DETAIL, { boardId }),
  );
  return response.data.data;
};
