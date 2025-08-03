import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getSearcMarketResult = async ({ keyword, page }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.SEARCH_MARKET, {}),
    {
      params: { keyword, page },
    },
  );
  return response.data.data;
};
