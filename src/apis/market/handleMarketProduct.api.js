import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';

export const getMarketProduct = async ({ productId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.MARKET_HANDLE_PRODUCT, { productId }),
  );
  return response.data.data;
};

export const deleteMarketProduct = async ({ productId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.MARKET_HANDLE_PRODUCT, { productId }),
  );
  return response.data.data;
};
