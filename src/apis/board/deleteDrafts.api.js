import { authApi } from '../axios-instance';
import { API_DOMAINS } from '@/constants/api';

export const deleteAllDraft = async () => {
  const response = await authApi.delete(API_DOMAINS.DELETE_ALL_DRAFT);
  return response.data.data;
};

export const deleteSelectedDraft = async ({ tempPostIds }) => {
  const response = await authApi.delete(API_DOMAINS.DELETE_SELECTED_DRAFT, {
    data: { tempPostIds },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};
