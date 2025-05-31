import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import Intro from '@/assets/imgs/boardIntro.svg';
import { AnimatePresence } from 'motion/react';
import { BoardMenuBar } from '../common/MenuBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { path } from '@/routes/path';
import { Loading } from '../common/Loading';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useFloating, offset, shift, flip } from '@floating-ui/react-dom';
import { FloatingBubble } from '../common/FloatingBubble';
import { MARKET_DESCRIPTION } from '@/constants/MarketConstant';

export const PostHeader = ({ isAuthor = false }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { boardId, postId, productId } = useParams();

  const MARKET = path.market.base;
  const isMarket = pathname.startsWith(MARKET);

  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: 'top',
    middleware: [offset(12), flip(), shift({ padding: 12 })],
  });

  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !isMarket,
  });

  const handleSearch = () => {
    if (isMarket) {
      navigate('');
    } else {
      navigate(`${path.board.base}/${boardId}/${path.board.specific.search}`);
    }
  };

  useEffect(() => {
    const handleOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    if (openModal) {
      document.addEventListener('touchmove', handleOutSide);
      document.addEventListener('mousedown', handleOutSide);
    }
    return () => {
      document.removeEventListener('touchmove', handleOutSide);
      document.removeEventListener('mousedown', handleOutSide);
    };
  }, [openModal]);

  return (
    <div
      className={cn(
        'fixed z-20 flex h-14 w-full max-w-[512px] items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4',
        { 'justify-end': isMarket && !productId },
      )}
    >
      {/* 중고거래 메인페이지는 뒤로가기 없음 */}
      {(!isMarket || productId) && (
        <Prev className="h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
      )}
      {!isMarket && isBoardLoading && <Loading />}
      {!isMarket && isBoardError && <p>Error</p>}
      {(isMarket ||
        (!isBoardLoading &&
          !isBoardError &&
          boardDetail?.boardWithFavoriteStatus?.boardName)) && (
        <div className="absolute left-1/2 top-1/2 flex w-fit max-w-[60%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1">
          <h1
            className={`line-clamp-1 flex-1 text-center font-semibold text-neutral-title ${boardDetail?.boardName?.length < 12 ? 'text-pageTitle' : 'text-subTitle'}`}
          >
            {isMarket
              ? 'Market'
              : boardDetail?.boardWithFavoriteStatus?.boardName}
          </h1>
          {postId === undefined && (
            <div ref={modalRef} className="relative flex">
              <button
                ref={refs.setReference}
                type="button"
                onClick={() => setOpenModal(!openModal)}
              >
                <img src={Intro} className="h-[1.625rem] w-[1.625rem]" />
              </button>
              <AnimatePresence>
                {openModal && (
                  <FloatingBubble
                    floatingStyles={floatingStyles}
                    setFloatingRef={refs.setFloating}
                    description={
                      isMarket
                        ? MARKET_DESCRIPTION
                        : boardDetail?.boardWithFavoriteStatus?.description
                    }
                  />
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        {/* 게시글 내에는 검색 기능 없음 */}
        {postId === undefined && productId == undefined && (
          <button type="button" onClick={handleSearch}>
            <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
          </button>
        )}
        <BoardMenuBar
          isAuthor={isAuthor}
          data={boardDetail}
          isMarket={isMarket}
        />
      </div>
    </div>
  );
};
