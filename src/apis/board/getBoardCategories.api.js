import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getBoardCategories = async ({ boardId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.BOARD_CATEGORIES, { boardId }),
    {},
  );
  return response.data.data;
};
