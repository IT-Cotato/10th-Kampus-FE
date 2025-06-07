import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostList } from '@/components/board/PostList';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import { PostHeader } from '@/components/board/PostHeader';
import { WriteButton } from '@/components/board/write/WriteButton';
import {
  getCardNewsList,
  getPostList,
  getTrendingList,
} from '@/apis/board/getPostList.api';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { Loading } from '@/components/common/Loading';
import { BOARD_TYPE } from '@/constants/boardConstant';
import { useInView } from 'react-intersection-observer';
import { useGetBoardCategory } from '@/state/query/board/useGetBoardCategory';

export const Board = () => {
  const { boardId } = useParams();
  const sortOptions = ['All', 'Newest', 'Registered', 'Popularity']; // 정렬 기준은 고정
  const [sortOrder, setSortOrder] = useState('All'); // 선택된 정렬 기준 값
  const [category, setCategory] = useState('All'); // 선택된 카테고리 값
  const { ref, inView } = useInView();

  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
  });

  // enable 속성으로 카테고리를 사용하지 않으면 쿼리가 실행되지 않음
  const { data: categoryData, isError: categoryError } = useGetBoardCategory(
    boardDetail?.boardWithFavoriteStatus?.usesCategories === true,
  );

  const {
    data: postList,
    fetchNextPage: fetchNextPostList,
    hasNextPage: hasNextPostList,
    isLoading: isPostLoading,
    isPending: isPostPending,
    error: isPostError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST, boardId, sortOrder, category],
    queryFn: ({ pageParam = 1 }) => {
      if (boardDetail.boardWithFavoriteStatus.boardType === BOARD_TYPE.CARD) {
        return getCardNewsList({ page: pageParam });
      } else if (false) {
        return getTrendingList({ page: pageParam });
      } else {
        return getPostList({
          boardId: boardId,
          page: pageParam,
          sort: getSortKey(sortOrder),
          category: category === 'All' ? '' : category,
        });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    enabled: boardDetail !== undefined,
  });

  const getSortKey = (option) => {
    switch (option) {
      case 'All':
      case 'Newest':
        return 'recent';
      case 'Registered':
        return 'old';
      case 'Popularity':
        return 'likeCount';
      default:
        return 'recent';
    }
  };

  useEffect(() => {
    if (inView && hasNextPostList) {
      fetchNextPostList();
    }
  }, [inView, hasNextPostList, fetchNextPostList]);

  const posts = postList?.pages?.map((page) => page.items).flat() || [];
  return (
    <div className="flex flex-1">
      <PostHeader />
      <div className="flex h-fit w-full flex-col pt-14">
        <div className="fixed z-10 flex w-full max-w-lg gap-[0.875rem] border-b bg-white px-4 py-5">
          {boardDetail?.boardWithFavoriteStatus?.usesCategories === true && (
            <FilterBox
              content={'Category'}
              dropList={categoryData}
              select={(selected) => setCategory(selected)}
              selected={category}
            />
          )}
          <FilterBox
            content={'Sort by'}
            dropList={sortOptions}
            select={(selected) => setSortOrder(selected)}
            selected={sortOrder}
          />
        </div>
        <div className="flex w-full flex-col divide-y bg-white px-4 pt-[4.875rem]">
          {isPostLoading && <Loading />}
          {isPostError && <p>Error Data Loading</p>}
          {/* 카드 뉴스 리스트 뷰, 일반 게시판 리스트 뷰의 UI가 다름 */}
          {!isPostLoading &&
            !isPostError &&
            posts &&
            posts.length > 0 &&
            posts.map((item, index) =>
              boardDetail?.boardWithFavoriteStatus?.boardType ===
              BOARD_TYPE.CARD ? (
                <TipsPostList key={index} data={item} boardId={boardId} />
              ) : (
                <PostList key={index} data={item} isActive={false} />
              ),
            )}
        </div>
        {/* 추후에 Trending 게시판인지 여부도 추가 해야합니다 */}
        {boardDetail &&
          boardDetail.boardWithFavoriteStatus.boardType !== BOARD_TYPE.CARD && (
            <WriteButton boardName={boardDetail.boardName} />
          )}
      </div>
    </div>
  );
};
