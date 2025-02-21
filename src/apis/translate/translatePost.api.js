import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const translatePost = async ({ postId }) => {
    const response = await authApi.post(generateApiPath(API_DOMAINS.TRANSLATE_POST, { postId }));
    return response.data.data
}