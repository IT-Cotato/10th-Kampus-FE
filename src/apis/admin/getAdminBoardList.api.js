import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const getAdminBoardList = async ({ status }) => {
  const response = await authApi.get((API_DOMAINS.ADMIN_BOARD), {
    params: { status },
  });
  return response.data.data;
};
