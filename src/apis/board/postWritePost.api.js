import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
export const postWritePost = async ({ data }) => {
    const response = await authApi.post(API_DOMAINS.POST_WRITE, data);
    return response.data.data
}