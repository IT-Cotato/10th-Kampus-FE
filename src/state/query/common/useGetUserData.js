import { getUserData } from '@/apis/common/getUserData.api';
import { QUERY_KEYS } from '@/constants/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export const useGetUserData = () => {
  const { accessToken, isInitializing } = useAuthStore();

  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_DETAIL],
    queryFn: () => getUserData(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!accessToken && !isInitializing,
  });
  return query;
};
