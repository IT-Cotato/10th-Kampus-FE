import { getAdminUser } from '@/apis/user/adminUserDetail.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminUserData = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_ADMIN_USER_ME],
    queryFn: () => getAdminUser(),
    retry: false,
    throwOnError: false,
  });
  return query;
};
