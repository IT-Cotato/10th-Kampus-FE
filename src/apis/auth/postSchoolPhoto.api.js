import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postSchoolPhoto = async ({ data, universityName }) => {
  const response = await authApi.post(API_DOMAINS.VERIFY_SCHOOL_PHOTO, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: { universityName },
  });
  return response.data.data;
};
