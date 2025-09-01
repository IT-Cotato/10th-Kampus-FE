import { API_DOMAINS } from '@/constants/api';
import { authApi } from '../axios-instance';

export const reissueToken = async () => {
  const response = await authApi.post(
    API_DOMAINS.POST_ACCESS_TOKEN,
    {},
    {
      withCredentials: true,
    },
  );

  const authorizationHeader = response.headers.authorization;
  if (!authorizationHeader) {
    throw new Error('No authorization header in response');
  }

  const newAccessToken = authorizationHeader.split(' ')[1];
  return newAccessToken;
};
