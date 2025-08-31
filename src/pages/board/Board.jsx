import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostList } from '@/components/board/PostList';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import { PostHeader } from '@/components/board/PostHeader';
import { WriteButton } from '@/components/board/write/WriteButton';
import { BOARD_TYPE } from '@/constants/boardConstant';
import { useInView } from 'react-intersection-observer';
import { useGetBoardCategory } from '@/state/query/board/useGetBoardCategory';
import { PATH } from '@/routes/path';
import { useBoardDetail } from '@/state/query/board/useGetBoardDetail';
import { useGetBoardPostList } from '@/state/query/board/useGetBoardPostList';
import { Loading } from '@/components/common/Loading';

export const Board = () => {
  const { boardId } = useParams();
  const isTrending = boardId === PATH.BOARD.SPECIFIC.TRENDING;
  const sortOptions = ['All', 'Newest', 'Registered', 'Popularity']; // 정렬 기준은 고정
  const [sortOrder, setSortOrder] = useState('All'); // 선택된 정렬 기준 값
  const [category, setCategory] = useState('All'); // 선택된 카테고리 값
  const { ref, inView } = useInView();

  const getSortKey = (option) => {
    switch (option) {
      case 'Newest':
      case 'All':
        return 'recent';
      case 'Registered':
        return 'old';
      case 'Popularity':
        return 'likeCount';
      default:
        return 'recent';
    }
  };

  const {
    data: postList,
    isPending: isPostPending,
    fetchNextPage,
    hasNextPage,
  } = useGetBoardPostList({
    boardId,
    sortOrder,
    category,
    getSortKey,
  });
  const { data: boardDetail } = useBoardDetail(boardId);

  // 카테고리는 boardDetail이 있을 때만 호출
  const { data: categoryData } = useGetBoardCategory(
    boardDetail?.boardWithFavoriteStatus?.usesCategories === true,
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = postList?.pages?.flatMap((p) => p.items) || [];

  return (
    <div className="flex flex-1">
      <PostHeader />
      <div className="flex w-full flex-1 flex-col pt-14">
        <div className="fixed z-10 flex w-full gap-[0.875rem] bg-white px-[1.125rem] pb-4 pt-[.875rem] width-fixed">
          {boardDetail?.boardWithFavoriteStatus?.usesCategories && (
            <FilterBox
              content="Category"
              dropList={categoryData}
              select={setCategory}
              selected={category}
            />
          )}
          <FilterBox
            content="Sort by"
            dropList={sortOptions}
            select={setSortOrder}
            selected={sortOrder}
          />
        </div>
        {posts.length === 0 &&
          (boardDetail?.boardWithFavoriteStatus?.boardType ===
          BOARD_TYPE.CARD ? (
            <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
              <Logo className="w-32 text-neutral-disabled" />
              <span className="text-center text-neutral-border-40">
                Coming Soon!
              </span>
            </div>
          ) : (
            <div className="flex h-full w-full -translate-y-10 flex-col items-center justify-center gap-2">
              <Logo className="w-32 text-neutral-disabled" />
              <span className="text-center text-neutral-border-40">
                There are no posts yet.
                <br />
                Please write the first post!
              </span>
            </div>
          ))}
        <div className="flex w-full flex-1 flex-col divide-y overflow-y-auto bg-white px-4 pt-[3.25rem]">
          {/* 카드 뉴스 리스트 뷰, 일반 게시판 리스트 뷰의 UI가 다름 */}
          {posts.map((item, index) =>
            !isTrending &&
            boardDetail?.boardWithFavoriteStatus?.boardType ===
              BOARD_TYPE.CARD ? (
              <TipsPostList key={index} data={item} boardId={boardId} />
            ) : (
              <PostList key={index} data={item} isActive={false} />
            ),
          )}
          {isPostPending && hasNextPage ? <Loading /> : <div ref={ref} />}
        </div>
        {!isTrending &&
          boardDetail?.boardWithFavoriteStatus?.boardType !==
            BOARD_TYPE.CARD && (
            <WriteButton boardName={boardDetail?.boardName} />
          )}
      </div>
    </div>
  );
};
