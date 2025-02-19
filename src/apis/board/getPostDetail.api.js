import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const getPostDetail = async ({ postId }) => {
    const response = await authApi.get(
        generateApiPath(API_DOMAINS.POST_GET_DETAIL, { postId }), {
    });
    return response.data.data
}