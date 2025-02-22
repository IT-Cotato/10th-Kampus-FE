import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getUniversity = async () => {
    const response = await authApi.get(API_DOMAINS.HOME_UNIVERSITY);
    return response.data.data;
};
