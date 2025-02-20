import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const deleteAdminNotice = async ({ noticeId }) => {
  const response = await authApi.delete(
    generateApiPath(API_DOMAINS.ADMIN_NOTICE_DETAILS, { noticeId }),
  );
  return response.data.data;
};
