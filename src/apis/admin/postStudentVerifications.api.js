import { generateApiPath } from '@/utils/generateApiPath';
import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postRejectStudentVerifications = async ({ verificationRecordId }) => {
  const response = await authApi.post(
      generateApiPath(API_DOMAINS.ADMIN_VERIFICATION_REJECT, { verificationRecordId }),
    );

  return response.data.data;
};

export const postApproveStudentVerifications = async ({ verificationRecordId }) => {
  const response = await authApi.post(
      generateApiPath(API_DOMAINS.ADMIN_VERIFICATION_APPROVE, { verificationRecordId }),
    );

  return response.data.data;
};
