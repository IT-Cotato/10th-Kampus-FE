import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const putAdminBoard = async ({ boardId, data }) => {
  const response = await authApi.put(
    generateApiPath(API_DOMAINS.ADMIN_BOARD_DETAIL, { boardId }),
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.data;
};
