import { getBoardList } from '@/apis/board/getBoardList.api';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardList = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
    queryFn: () => getBoardList(),
    staleTime: 20 * 1000, // 20초
  });
  return query;
};
