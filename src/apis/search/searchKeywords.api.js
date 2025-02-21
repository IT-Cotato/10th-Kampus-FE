import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getSearchKeywords = async () => {
    const response = await authApi.get(API_DOMAINS.SEARCH_KEYWORD);
    return response.data.data;
};
