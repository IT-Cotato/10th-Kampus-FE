import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';

export const getPostList = async ({ boardId, page, sort, category }) => {
  const params = { page };

  if (sort) params.sort = sort;
  if (category) params.category = category;

  const response = await authApi.get(
    generateApiPath(API_DOMAINS.POST_GET_LIST, { boardId }),
    { params },
  );

  return response.data.data;
};

export const getCardNewsList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.POST_GET_CARDNEWS, {
    params: { page },
  });
  return response.data.data;
};

export const getTrendingList = async ({ page }) => {
  const response = await authApi.get(API_DOMAINS.POST_GET_TRENDING, {
    params: { page },
  });
  return response.data.data;
};
