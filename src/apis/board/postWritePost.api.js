import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postWritePost = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.POST_WRITE, data);
  return response.data.data;
};

// 임시 저장 게시물 발행
export const postWriteDraft = async ({ postDraftId, data }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.POST_WRITE_DRAFT, { postDraftId }),
    data,
  );
  return response.data.data;
};
