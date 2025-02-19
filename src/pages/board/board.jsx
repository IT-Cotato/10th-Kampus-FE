import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const [boardData, setBoardData] = useState({
    post: [
      {
        id: 0,
        title: 'Title',
        content: 'content',
        likes: 10,
        comments: 10,
        createdTime: '1 day ago',
        thumbnailUrl: null,
        board_type: 'Tips for living in Korea',
        scrap: false,
      },
      {
        id: 1,
        title: 'Title',
        content: 'content',
        like: 8,
        comment: 4,
        time: '1 day ago',
        image: null,
        board_type: 'Information',
        scrap: true,
      },
    ],
  });
  const checkIsActive = () => {
    setIsActive({
      trending: boardDetail.boardName === "Trending",
      scrap: boardDetail.boardName === "How to live in Korea",
      filter: boardDetail.boardName === "Question" || boardDetail.boardName === "Information"
    })
  }
  const sortPostByScrap = (posts) => {
    return [...posts].sort((a, b) => {
      if (b.scrap !== a.scrap) return b.scrap - a.scrap;
      return b.postId - a.postId; // postID 정렬 추가
    }); // scrap 우선 정렬
    // 여기에 백에서 보내주는 양식 보고 시간 기준 정렬 추가해야함
  };
  useEffect(() => {
    // 서버와 통신되면 리액트 쿼리로 바꿀 예정
    if (isActive.scrap) {
      setBoardData((prev) => {
        const sortedPost = sortPostByScrap(prev.post);
        if (
          !sortedPost.every(
            (post, index) => post.scrap === prev.post[index].scrap,
          )
        ) {
          return { ...prev, post: sortedPost };
        }
        return prev;
      });
    }
  }, [boardData.post.map((post) => post.scrap).join()]); // 스크랩이 바뀔 때만
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
          <div className="flex w-full cursor-pointer items-center justify-center rounded-[0.625rem] bg-neutral-bg-10 py-3 text-subTitle font-normal text-[#6A6A6A]">
            Notice
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
