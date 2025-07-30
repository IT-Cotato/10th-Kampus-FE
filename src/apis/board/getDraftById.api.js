import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const getDraftById = async ({ postDraftId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.HANDLE_DRAFT_DETAILS, { postDraftId }),
  );
  return response.data.data;
};
