import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postSaveDraft = async ({ data }) => {
    const response = await authApi.post(API_DOMAINS.POST_SAVE_DRAFT, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.data
}