import { getDraftCount } from '@/apis/comment/getDraftCount.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetDraftCount = () => {
  const query = useQuery({
    queryFn: () => getDraftCount(),
    queryKey: [QUERY_KEYS.GET_DRAFT_COUNT],
  });
  return query;
};
