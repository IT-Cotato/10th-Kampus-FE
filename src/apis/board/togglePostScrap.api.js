import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const addPostScrap = async ({ postId }) => {
    const response = await authApi.post(
        generateApiPath(API_DOMAINS.POST_SCRAP_TOGGLE, { postId }))
    return response.data.data
}
export const deletePostScrap = async ({ postId }) => {
    const response = await authApi.delete(
        generateApiPath(API_DOMAINS.POST_SCRAP_TOGGLE, { postId }))
    return response.data.data
}