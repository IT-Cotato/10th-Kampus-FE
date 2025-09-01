import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getMyScrapedPosts = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.GET_MY_SCRAPED_POST, {
    params: { page },
  });
  return response.data.data;
};

export const getMyScrapedProducts = async ({ page, size }) => {
  const response = await authApi.get(API_DOMAINS.GET_MY_SCRAPED_PRODUCT, {
    params: { page, size },
  });
  return response.data.data;
};
