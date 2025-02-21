import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getPostList = async ({ boardId, page }) => {
    const response = await authApi.get(
        generateApiPath(API_DOMAINS.POST_GET_LIST, { boardId }), {
        params: { page }
    });
    return response.data.data
}
export const getCardNewsList = async ({ page }) => {
    const response = await authApi.get(API_DOMAINS.POST_GET_CARDNEWS, {
        params: { page }
    });
    return response.data.data
}
export const getTrendingList = async ({ page }) => {
    const response = await authApi.get(API_DOMAINS.POST_GET_TRENDING, {
        params: { page }
    });
    return response.data.data
}