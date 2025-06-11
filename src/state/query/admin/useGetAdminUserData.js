import { getUser } from '@/apis/user/userDetail.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminUserData = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_USER_ME],
    queryFn: () => getUser(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
