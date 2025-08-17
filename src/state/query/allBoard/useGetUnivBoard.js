import { getUnivBoard } from '@/apis/board/getUnivBoard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUnivBoard = (state) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_UNIV_BOARD],
    queryFn: () => getUnivBoard(),
    staleTime: 20 * 1000, // 20초
    enabled: state,
  });
  return query;
};
