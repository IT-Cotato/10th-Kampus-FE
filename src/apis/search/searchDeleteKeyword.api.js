import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const deleteSearchKeyword = async (keywordId) => {
    const response = await authApi.delete(
        generateApiPath(API_DOMAINS.SEARCH_DELETE, { keywordId }));
    return response.data.data;
};
