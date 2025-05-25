import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postSchoolPhoto = async ({ data, universityCode }) => {
  const response = await authApi.post(API_DOMAINS.VERIFY_SCHOOL_PHOTO, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: { universityCode },
  });
  return response.data.data;
};
