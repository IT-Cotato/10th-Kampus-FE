import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostList } from '@/components/board/PostList';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import { PostHeader } from '@/components/board/PostHeader';
import { path } from '@/routes/path';
import kakao from '@/assets/imgs/loginKakao.png'; // 이미지 확인용
import { WriteButton } from '@/components/board/write/WriteButton';

export const Board = () => {
  const { boardTitle } = useParams(); // 서버와 통신 시, 파라미터에 따라 데이터 가져오기
  const isActive = {
    // 게시글 종류
    trending: boardTitle === 'trending',
    scrap: boardTitle === 'how-to-live-in-korea',
    filter: boardTitle === 'question' || boardTitle === 'information',
  };
  const [boardData, setBoardData] = useState({
    board_title: 'Tips for living in Korea',
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
        likes: 8,
        comments: 4,
        createdTime: '1 day ago',
        thumbnailUrl: kakao,
        board_type: 'Information',
        scrap: true,
      },
    ],
  });
  const sortPostByScrap = (posts) => {
    return [...posts].sort((a, b) => {
      if (b.scrap !== a.scrap) return b.scrap - a.scrap;
      return b.postId - a.postId  // postID 정렬 추가
    }); // scrap 우선 정렬
    // 여기에 백에서 보내주는 양식 보고 시간 기준 정렬 추가해야함
  };
  useEffect(() => {
    // 서버와 통신되면 리액트 쿼리로 바꿀 예정
    if (isActive.scrap) {
      setBoardData((prev) => {
        const sortedPost = sortPostByScrap(prev.post);
        if (!sortedPost.every((post, index) => post.scrap === prev.post[index].scrap)) {
          return { ...prev, post: sortedPost };
        }
        return prev;
      });
    }
  }, [boardData.post.map((post) => post.scrap).join()]); // 스크랩이 바뀔 때만

  return (
    <div className="flex h-full w-full flex-col">
      <PostHeader path={path} />
      <div className="flex w-full flex-col gap-[0.875rem] bg-white px-4 pb-1 pt-5">
        <div className="flex w-full cursor-pointer items-center justify-center rounded-[0.625rem] bg-neutral-bg-10 py-3 text-subTitle font-normal text-[#6A6A6A]">
          Notice
        </div>
        {isActive.filter && <FilterBox />}{' '}
        {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
      </div>
      <div className="flex w-full flex-1 flex-col divide-y bg-white px-4">
        {boardData.post.map((item, index) =>
          isActive.scrap /** 카드 뉴스 리스트 뷰와 포스트 리스트 뷰가 구조가 달라서 따로 컴포넌트로 만들었습니다*/ ? (
            <TipsPostList
              key={index}
              data={item}
              setBoardData={setBoardData}
            />
          ) : (
            <PostList key={index} data={item} isActive={isActive.trending} />
          ),
        )}
      </div>
      <WriteButton />
    </div>
  );
};
