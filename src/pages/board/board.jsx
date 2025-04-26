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
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { Loading } from '@/components/common/Loading';
import { MarketList } from '@/components/board/MarketList';

const CARDNEWS = 'Card News';
const MARKET = 'Market';
const TRENDING = 'Trending';
const QUESTION = 'Question';
const INFORMATION = 'Information';

export const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const {
    data: postList,
    isLoading: isPostLoading,
    error: isPostError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
    queryFn: () => {
      if (boardId === '1') {
        // boardName = CARDNEWS
        return getCardNewsList({ page: 1 });
      } else if (boardId === '4') {
        // boardName = TRENDING
        return getTrendingList({ page: 1 });
      } else if (boardId === '5') {
        // boardName = MARKET
        return getTrendingList({ page: 1 }); // Market으로 수정해야함
      } else {
        return getPostList({ boardId: boardId, page: 1 });
      }
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

  const [boardType, setBoardType] = useState({
    trending: false,
    cardnews: false,
    market: false,
    filter: false,
  });

  const checkBoardType = () => {
    setBoardType({
      trending: boardDetail.boardName === TRENDING,
      cardnews: boardDetail.boardName === CARDNEWS,
      market: boardDetail.boardName === MARKET,
      filter:
        boardDetail.boardName === QUESTION ||
        boardDetail.boardName === INFORMATION,
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
      checkBoardType();
    }
  }, [boardDetail]);

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
          {boardType.filter && <FilterBox />}
          {/** 추후, 백엔드와 필터 작업 시 props 넘겨줘야 함 */}
        </div>
        <div className="flex w-full flex-col divide-y bg-white px-4">
          {isPostLoading && <Loading />}
          {isPostError && <p>Error Data Loading</p>}
          {/* 카드 뉴스 리스트 뷰, 일반 게시판 리스트 뷰, Market 리스트 뷰의 UI가 다름 */}
          {!isPostLoading &&
            !isPostError &&
            postList.posts?.length > 0 &&
            postList.posts.map((item) =>
              boardType.cardnews ? (
                <TipsPostList key={item} data={item} boardId={boardId} />
              ) : boardType.market ? (
                <MarketList key={item} data={item} />
              ) : (
                <PostList
                  key={item}
                  data={item}
                  isTrendingBoard={boardType.trending}
                />
              ),
            )}
        </div>
        {boardDetail &&
          boardDetail.boardName !== TRENDING &&
          boardDetail.boardName !== CARDNEWS && (
            <WriteButton boardName={boardDetail.boardName} />
          )}
      </div>
    </div>
  );
};
