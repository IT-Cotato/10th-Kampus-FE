import { getAdminCategory } from '@/apis/admin/getAdminCategory.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetCategory = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.ADMIN_GET_CATEGORY],
    queryFn: () => getAdminCategory(),
    select: (res) => res.categories,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
