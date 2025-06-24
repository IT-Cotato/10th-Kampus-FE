import { getBoardList } from '@/apis/board/getBoardList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardList = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
    queryFn: () => getBoardList(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
  return query;
};
