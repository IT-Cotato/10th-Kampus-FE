import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const getAdminNoticeDetail = async ({ noticeId }) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.ADMIN_NOTICE_DETAILS, { noticeId }),
  );
  return response.data.data;
};
