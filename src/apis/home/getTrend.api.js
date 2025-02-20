import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getTrend = async () => {
    const response = await authApi.get(API_DOMAINS.HOME_TRENDING);
    return response.data.data;
};
