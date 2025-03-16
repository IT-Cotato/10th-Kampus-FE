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
import { PostListSkeleton } from '@/components/board/PostListSkeleton';

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
      trending: boardDetail.boardName === 'Trending',
      scrap: boardDetail.boardName === 'How to live in Korea',
      filter:
        boardDetail.boardName === 'Question' ||
        boardDetail.boardName === 'Information',
    });
  };
  const sortPostByScrap = (posts) => {
    return [...posts].sort((a, b) => {
      if (b.scrap !== a.scrap) return b.scrap - a.scrap;
      return b.postId - a.postId; // postID 정렬 추가
    }); // scrap 우선 정렬
    // 여기에 백에서 보내주는 양식 보고 시간 기준 정렬 추가해야함
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
          {isPostLoading &&
            [...Array(8)].map((_, index) => <PostListSkeleton key={index} />)}
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
          {isPostPending ? <Loading /> : <div ref={ref} />}
        </div>
        {boardDetail &&
          boardDetail.boardName !== 'Trending' &&
          boardDetail.boardName !== 'How to live in Korea' && (
            <WriteButton boardName={boardDetail.boardName} />
          )}
      </div>
    </div>
  );
};
