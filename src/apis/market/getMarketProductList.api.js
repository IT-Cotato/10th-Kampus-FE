import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getMarketProductList = async ({ page, sort, categoryName }) => {
  const response = await authApi.get(API_DOMAINS.MARKET_PRODUCT_LIST, {
    params: { page, sort, categoryName },
  });
  return response.data.data;
};
