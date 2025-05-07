import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostList } from '@/components/board/PostList';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import { PostHeader } from '@/components/board/PostHeader';
import { path } from '@/routes/path';
import { WriteButton } from '@/components/board/write/WriteButton';
import {
  getCardNewsList,
  getPostList,
  getTrendingList,
} from '@/apis/board/getPostList.api';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { useInView } from 'react-intersection-observer';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { Loading } from '@/components/common/Loading';
import { BOARD_TYPE } from '@/constants/boardConstant';

export const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const {
    data: postList,
    fetchNextPage: fetchNextPostList,
    hasNextPage: hasNextPostList,
    isLoading: isPostLoading,
    isPending: isPostPending,
    error: isPostError,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
    queryFn: ({ pageParam = 1 }) => {
      if (boardId === '5') {
        return getCardNewsList({ page: pageParam });
      } else if (boardId === '4') {
        return getTrendingList({ page: pageParam });
      } else {
        return getPostList({ boardId: boardId, page: pageParam });
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
  });
  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
  });
  const [isActive, setIsActive] = useState({
    trending: false,
    scrap: false,
    filter: false,
  });
  const checkIsActive = () => {
    setIsActive({
      trending: boardDetail.boardName === BOARD_NAME_CONSTANTS.TRENDING.TREND,
      scrap: boardDetail.boardName === BOARD_NAME_CONSTANTS.SCRAP.CARD_NEWS,
      filter:
        boardDetail.boardName === BOARD_NAME_CONSTANTS.FILTER.QUESTION ||
        boardDetail.boardName === BOARD_NAME_CONSTANTS.FILTER.INFORMATION,
    });
  };
  useEffect(() => {
    if (boardDetail) {
      checkIsActive();
    }
  }, [boardDetail]);
  useEffect(() => {
    if (inView && hasNextPostList) {
      fetchNextPostList();
    }
  }, [inView, hasNextPostList, fetchNextPostList]);

  const posts = postList?.pages?.map((page) => page.posts).flat() || [];
  return (
    <div className="flex flex-1">
      <PostHeader path={path} />
      <div className="flex flex-1 flex-col pt-14">
        <div className="flex w-full flex-col gap-[0.875rem] bg-white px-4 pb-1 pt-5">
          <div
            className="flex w-full cursor-pointer items-center justify-center rounded-[0.625rem] bg-primary-10 py-2 text-small text-neutral-base"
            onClick={() => navigate(path.boardGuide)}
          >
            Board guide
          </div>
          {isActive.filter && <FilterBox />}
          {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
        </div>
        <div className="flex w-full flex-col divide-y bg-white px-4">
          {/** 회의 결과 짧은 로딩 시간으로 스켈레톤 말고 로딩 스피너로 변경하였습니다 */}
          {isPostLoading && <Loading />}
          {isPostError && <p>Error Data Loading</p>}
          {/** 카드 뉴스 리스트 뷰와 포스트 리스트 뷰가 구조가 달라서 따로 컴포넌트로 만들었습니다*/}
          {!isPostLoading &&
            !isPostError &&
            posts &&
            posts.length > 0 &&
            posts.map((item, index) =>
              isActive.scrap ? (
                <TipsPostList key={index} data={item} boardId={boardId} />
              ) : (
                <PostList
                  key={index}
                  data={item}
                  isActive={isActive.trending}
                />
              ),
            )}
          {isPostPending && hasNextPostList ? <Loading /> : <div ref={ref} />}
        </div>
        {boardDetail &&
          boardDetail.boardName !== BOARD_NAME_CONSTANTS.TRENDING.TREND &&
          boardDetail.boardName !== BOARD_NAME_CONSTANTS.SCRAP.CARD_NEWS && (
            <WriteButton boardName={boardDetail.boardName} />
          )}
      </div>
    </div>
  );
};
