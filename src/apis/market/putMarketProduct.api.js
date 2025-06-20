import { API_DOMAINS } from '@/constants/api';
import { authApi } from '@/apis/axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const putMarketProduct = async ({ productId, data }) => {
  const response = await authApi.put(
    generateApiPath(API_DOMAINS.MARKET_HANDLE_PRODUCT, { productId }),
    data,
  );
  return response.data.data;
};
