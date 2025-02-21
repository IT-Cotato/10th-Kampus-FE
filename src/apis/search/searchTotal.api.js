import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getSearcTotalResult = async ({ keyword, page }) => {
    const response = await authApi.get(API_DOMAINS.SEARCH_TOTAL, {
        params: { keyword, page }
    });
    return response.data.data;
};
