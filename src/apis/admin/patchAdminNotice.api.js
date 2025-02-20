import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const patchAdminNotice = async ({ noticeId, data }) => {
  const response = await authApi.patch(
    generateApiPath(API_DOMAINS.ADMIN_NOTICE_DETAILS, { noticeId }),
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.data;
};
