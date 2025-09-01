import { authApi } from '@/apis/axios-instance';
import { API_DOMAINS } from '@/constants/api';
import { generateApiPath } from '@/utils/generateApiPath';

export const addProductScrap = async ({ productId }) => {
  const response = await authApi.post(
    generateApiPath(API_DOMAINS.PRODUCT_SCRAP_TOGGLE, { productId }),
  );
  return response.data.data;
};
export const deleteProductScrap = async ({ productId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.PRODUCT_SCRAP_TOGGLE, { productId }),
  );
  return response.data.data;
};
