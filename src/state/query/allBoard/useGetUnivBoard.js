import { getUnivBoard } from '@/apis/board/getUnivBoard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUnivBoard = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_UNIV_BOARD],
    queryFn: () => getUnivBoard(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
