import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getPostList = async ({ boardId, page }) => {
    const response = await authApi.get(API_DOMAINS.BOARD_PUBLIC, {
        params: { boardId, page }
    });
    return response.data.data
}