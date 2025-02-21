import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const postSchoolEmailCodeSend = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.SEND_SCHOOL_EMAIL_CODE, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};

export const postSchoolEmailCodeVerify = async ({ data }) => {
  const response = await authApi.post(API_DOMAINS.VERIFY_SCHOOL_EMAIL_CODE, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data.data;
};
