import { getUnivBoard } from '@/apis/board/getUnivBoard.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetUnivBoard = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_UNIV_BOARD],
    queryFn: () => getUnivBoard(),
    staleTime: 60 * 60 * 1000, // 60분
    gcTime: 65 * 60 * 1000, // 65분
  });
  return query;
};
