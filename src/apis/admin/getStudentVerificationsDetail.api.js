import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';
import { generateApiPath } from '@/utils/generateApiPath';

export const getStudentVerificationDetail = async ({
  verificationRecordId,
}) => {
  const response = await authApi.get(
    generateApiPath(API_DOMAINS.ADMIN_VERIFICATION_DETAILS, {
      verificationRecordId,
    }),
  );

  return response.data.data;
};
