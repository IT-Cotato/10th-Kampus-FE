import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const addCommentLike = async ({ commentId }) => {
    const response = await authApi.post(
        generateApiPath(API_DOMAINS.COMMENT_LIKE_TOGGLE, { commentId }))
    return response.data.data
}
export const deleteCommentLike = async ({ commentId }) => {
    const response = await authApi.delete(
        generateApiPath(API_DOMAINS.COMMENT_LIKE_TOGGLE, { commentId }))
    return response.data.data
}