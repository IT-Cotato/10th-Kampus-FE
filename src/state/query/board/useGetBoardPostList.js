import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostList, getTrendingList } from '@/apis/board/getPostList.api';
import { QUERY_KEYS } from '@/constants/api';
import { PATH } from '@/routes/path';

// 게시판 상세 조회
export const useGetBoardPostList = ({
  boardId,
  sortOrder,
  category,
  getSortKey,
}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST, { boardId, sortOrder, category }],
    queryFn: ({ pageParam = 1 }) => {
      if (boardId === PATH.BOARD.SPECIFIC.TRENDING) {
        return getTrendingList({ page: pageParam });
      } else {
        return getPostList({
          boardId,
          page: pageParam,
          sort: getSortKey(sortOrder),
          category: category === 'All' ? '' : category,
        });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNext ? allPages.length + 1 : undefined,
    enabled: !!boardId,
  });
};
