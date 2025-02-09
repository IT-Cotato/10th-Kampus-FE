import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import Menubar from '@/assets/imgs/menubar.svg?react';
import Pin from '@/assets/imgs/pin.svg?react';
import { PostList } from '@/components/board/PostList';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import { FilterBox } from '@/components/board/FilterBox';
import { TipsPostList } from '@/components/board/TipsPostList';
import kakao from '@/assets/imgs/loginKakao.png'; // 이미지 확인용
import { WriteButton } from '@/components/board/write/WriteButton';

export const Board = () => {
  const navigate = useNavigate();
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
        title: 'Title',
        content: 'content',
        like: 10,
        comment: 10,
        time: '1 day ago',
        image: null,
        board_type: 'Tips for living in Korea',
        scrap: false,
        postId: 1
      },
      {
        title: 'Title',
        content: 'content',
        like: 8,
        comment: 4,
        time: '1 day ago',
        image: kakao,
        board_type: 'Information',
        scrap: false,
        postId: 2
      },
    ],
  });
  const [openPinModal, setOpenPinModal] = useState(false); // 핀 선택 창
  const [pinAni, setPinAni] = useState(false); // 핀 애니메이션 상태
  const [selectScrapState, setSelectScrapState] = useState(false); // 선택한 스크랩의 상태
  const [scrapAni, setScrapAni] = useState(false); // 스크랩 애니메이션 상태

  const startPinAni = () => {
    // 핀 애니메이션
    setOpenPinModal(false);
    startAnimation(setPinAni);
    // 이 때 백엔드와 사용자의 보드 핀 또는 스크랩 상태 업데이트 해야 함
  };
  const startAnimation = (set) => {
    // 애니메이션 함수
    set(true);
    setTimeout(() => {
      set(false);
    }, 1500);
  };
  const sortPostByScrap = (posts) => {
    return [...posts].sort((a, b) => b.scrap - a.scrap); // scrap 우선 정렬
    // 여기에 백에서 보내주는 양식 보고 시간 기준 정렬 추가해야함
  };
  const handleScrap = (index) => {
    // 자식 컴포넌트 (TipsPostList)에서의 스크랩 관리 함수
    setBoardData((prev) => {
      const updatedPost = prev.post.map((post, i) => {
        if (i === index) {
          setSelectScrapState(post.scrap);
          return { ...post, scrap: !post.scrap };
        }
        return post;
      }); // 스크랩 업데이트 이후
      const sortedPost = sortPostByScrap(updatedPost); // 정렬하기
      return { ...prev, post: sortedPost }; // 정렬한 데이터 리턴
    });
    startAnimation(setScrapAni); // 스크랩 애니메이션 시작
  };

  useEffect(() => {
    // 서버와 통신되면 리액트 쿼리로 바꿀 예정
    if (isActive.scrap) {
      setBoardData((prev) => ({
        ...prev,
        post: sortPostByScrap(prev.post),
      }));
    }
  }, []);
  return (
    <div className="flex h-full w-full flex-col">
      {pinAni && (
        <StateChangeAnimate
          state={!pinAni}
          changeToTrueText={'Pinned to the board'}
          changeToFalseText={'Unpinned from the board'}
        />
      )}{' '}
      {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
      {scrapAni && (
        <StateChangeAnimate
          state={selectScrapState}
          changeToTrueText={'Add to scrap'}
          changeToFalseText={'Remove from Scrap'}
        />
      )}
      <div className="flex w-full items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4">
        <Prev
          className="h-5 w-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="absolute left-1/2 -translate-x-1/2 transform whitespace-nowrap text-subTitle font-medium text-neutral-title">
          {boardTitle}
        </p>
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
          <div className="h-5 w-5 cursor-pointer text-neutral-title">
            <Menubar
              className="h-5 w-5"
              onClick={() => setOpenPinModal(!openPinModal)}
            />
            {openPinModal && (
              <div
                className="absolute right-4 top-12 flex items-center justify-center gap-2 rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-3 py-2 shadow-md"
                onClick={() => startPinAni()}
              >
                <p className="text-base">
                  {!pinAni ? 'Add to Pin' : 'Remove the Pin'}
                </p>{' '}
                {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
                <Pin className="h-[1.125rem] w-[1.125rem]" />
              </div>
            )}
          </div>
        </div>
      </div>
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
              handleScrap={handleScrap}
              index={index}
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
