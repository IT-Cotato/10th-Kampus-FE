import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
export const translateText = async ({ content }) => {
    const response = await authApi.post(API_DOMAINS.TRANSLATE_TEXT, content);
    return response.data.data
}