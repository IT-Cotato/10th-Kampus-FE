import { getDraftList } from '@/apis/board/getDraftList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetDraftList = () => {
  const query = useQuery({
    queryFn: () => getDraftList({ page: 1 }),
    queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
  });
  return query;
};
