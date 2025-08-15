import { useQuery } from '@tanstack/react-query';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';

// 게시판 정보 조회
export const useBoardDetail = (boardId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId }),
    enabled: !!boardId && boardId !== PATH.BOARD.SPECIFIC.TRENDING,
  });
};
