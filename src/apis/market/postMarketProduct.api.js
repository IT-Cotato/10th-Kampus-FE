import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const postMarketProduct = async (data) => {
  const response = await authApi.post(API_DOMAINS.MARKET_POST_PRODUCT, data);
  return response.data.data;
};
