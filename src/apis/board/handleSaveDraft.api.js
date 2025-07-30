import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postSaveDraft = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.POST_SAVE_DRAFT, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
};

export const patchSaveDraft = async ({ data, postDraftId }) => {
  const response = await authApi.patch(
    generateApiPath(API_DOMAINS.HANDLE_DRAFT_DETAILS, { postDraftId }),
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.data;
};
