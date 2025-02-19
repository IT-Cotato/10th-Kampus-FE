import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const addBoardFavorite = async ({ boardId }) => {
    const response = await authApi.post(
        generateApiPath(API_DOMAINS.BOARD_FAVORITE_TOGGLE, { boardId }), {
    })
    return response.data.data
}
export const deleteBoardFavorite = async ({ boardId }) => {
    const response = await authApi.delete(
        generateApiPath(API_DOMAINS.BOARD_FAVORITE_TOGGLE, { boardId }), {
    })
    return response.data.data
}