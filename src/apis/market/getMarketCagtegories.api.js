import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getMarketCategories = async () => {
  const response = await authApi.get(API_DOMAINS.MARKET_CATEGORIES);
  return response.data.data;
};
