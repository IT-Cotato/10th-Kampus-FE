import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getBoardList = async () => {
    const response = await authApi.get(API_DOMAINS.BOARD_PUBLIC);
    return response.data.data
}