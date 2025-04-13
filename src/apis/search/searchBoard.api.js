import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getSearcBoardResult = async ({ keyword, boardId, page }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.SEARCH_BOARD, { boardId }),
    {
      params: { keyword, page },
    },
  );
  return response.data.data;
};
