import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const addComment = async ({ postId }) => {
    const response = await authApi.post(generateApiPath(API_DOMAINS.COMMENT_HANDLE, { postId }));
    return response.data.data
}