import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const patchMarketProductStatus = async ({
  productId,
  productStatus,
}) => {
  const response = await authApi.patch(
    generateApiPath(API_DOMAINS.MARKET_PATCH_PRODUCT_STATUS, { productId }),
    null,
    {
      params: { productStatus },
    },
  );
  return response.data.data;
};
