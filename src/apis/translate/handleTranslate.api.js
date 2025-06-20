import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';
export const postTranslatePost = async ({ postId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.TRANSLATE_POST, { postId }),
  );
  return response.data.data;
};

export const postTranslateMarket = async ({ productId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.TRANSLATE_PRODUCT, { productId }),
  );
  return response.data.data;
};

export const postTranslateText = async (content) => {
  const response = await authApi.post(API_DOMAINS.TRANSLATE_TEXT, content);
  return response.data.data;
};

export const postWriteTranslate = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.TRANSLATE_CREATE_POST, data);
  return response.data.data;
};
