import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const getInquiryDetail = async ({ inquiryId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.GET_INQUIRY_DETAILS, { inquiryId }),
  );
  return response.data.data;
};
