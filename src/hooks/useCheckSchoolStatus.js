import { getSchoolStatus } from '@/apis/auth/getSchoolStatus.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useCheckSchoolStatus = () => {
  const query = useQuery({
    queryFn: getSchoolStatus,
    queryKey: [QUERY_KEYS.GET_MY_SCHOOL_VERIFICATION],
    select: (res) => res.status,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });

  return {
    query,
  };
};
