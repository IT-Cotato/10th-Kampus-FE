import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostList } from '@/components/board/PostList';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import { PostHeader } from '@/components/board/PostHeader';
import { path } from '@/routes/path';
import { WriteButton } from '@/components/board/write/WriteButton';
import { getPostList } from '@/apis/board/getPostList.api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { Loading } from '@/components/common/Loading';

export const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { data: postList, isLoading: isPostLoading, error: isPostError } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
    queryFn: () => getPostList({ boardId: boardId, page: 0 })
  })
  const { data: boardDetail, isLoading: isBoardLoading, error: isBoardError } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId })
  })
  const [isActive, setIsActive] = useState({
    trending: false,
    scrap: false,
    filter: false
  })
  const checkIsActive = () => {
    setIsActive({
      trending: boardDetail.boardName === "Trending",
      scrap: boardDetail.boardName === "How to live in Korea",
      filter: boardDetail.boardName === "Question" || boardDetail.boardName === "Information"
    })
    console.log(postList)
  }
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
  }, [boardDetail])
  return (
    <div className="w-full h-full">
      <PostHeader path={path} />
      <div className="flex flex-col w-full h-full pt-14">
        <div className="flex w-full flex-col gap-[0.875rem] bg-white px-4 pb-1 pt-5">
          <div className="flex w-full cursor-pointer items-center justify-center rounded-[0.625rem] bg-primary-10 py-2 text-small text-neutral-base"
            onClick={() => navigate(path.boardGuide)}>
            Board guide
          </div>
          {isActive.filter && <FilterBox />}
          {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
        </div>
        <div className="flex flex-col flex-1 w-full px-4 bg-white divide-y">
          {isPostLoading &&
            <Loading />
          }
          {isPostError &&
            <p>Error Data Loading</p>
          }
          {/** 카드 뉴스 리스트 뷰와 포스트 리스트 뷰가 구조가 달라서 따로 컴포넌트로 만들었습니다*/}
          {!isPostLoading && !isPostError && postList && postList.posts.map((item, index) =>
            isActive.scrap ? (
              <TipsPostList
                key={index}
                data={item}
                boardId={boardId}
              />
            ) : (
              <PostList key={index} data={item} isActive={isActive.trending} />
            ),
          )}
        </div>
        <WriteButton boardName={boardDetail && boardDetail.boardName} />
      </div>
    </div>
  );
};
