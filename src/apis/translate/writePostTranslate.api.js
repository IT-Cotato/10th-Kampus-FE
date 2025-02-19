import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
export const writePostTranslate = async ({ data }) => {
    const response = await authApi.post(API_DOMAINS.TRANSLATE_POST, data);
    return response.data.data
}