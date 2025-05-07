import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import Intro from '@/assets/imgs/boardIntro.svg';
import { AnimatePresence, motion } from 'motion/react';
import { BoardMenuBar } from '../common/MenuBar';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../common/Loading';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardDetail } from '@/apis/board/getBoardDetail.api';
import { useEffect, useRef, useState } from 'react';
import { useFloating, offset, shift, flip } from '@floating-ui/react-dom';

export const PostHeader = ({ path, isAuthor = false }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: 'top',
    middleware: [offset(12), flip(), shift({ padding: 12 })],
  });
  const { boardId, postId } = useParams();
  const {
    data: boardDetail,
    isLoading: isBoardLoading,
    error: isBoardError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
    queryFn: () => getBoardDetail({ boardId: boardId }),
  });
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
    <div className="fixed z-50 flex w-full max-w-[512px] items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4">
      <Prev className="h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
      {isBoardLoading && <Loading />}
      {isBoardError && <p>Error Data Loading</p>}
      {!isBoardLoading &&
        !isBoardError &&
        boardDetail.boardWithFavoriteStatus.boardName && (
          <div className="absolute left-1/2 top-1/2 flex w-fit max-w-[60%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1">
            <p
              className={`line-clamp-1 flex-1 text-center font-semibold text-neutral-title ${boardDetail?.boardName?.length < 12 ? 'text-pageTitle' : 'text-subTitle'}`}
            >
              {boardDetail.boardWithFavoriteStatus.boardName}
            </p>
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
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: '-50%', scale: 0, y: -10 },
                        visible: { opacity: 1, x: '-50%', scale: 1, y: 0 },
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      transition={{
                        visualDuration: 0.3,
                      }}
                      className="absolute left-1/2 top-full border-b-[1.5rem] border-l-[1rem] border-r-[1rem] border-b-primary-base border-l-transparent border-r-transparent"
                    >
                      {/* 본문 부분 */}
                      <div
                        ref={refs.setFloating}
                        style={{ ...floatingStyles }}
                        className="absolute w-[80vw] max-w-[350px] break-normal rounded-[.625rem] bg-primary-base p-4 text-base text-white"
                      >
                        {boardDetail.boardWithFavoriteStatus.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            navigate(
              `${path.board.base}/${boardId}/${path.board.specific.search}`,
            )
          }
        >
          <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
        </button>
        <BoardMenuBar isAuthor={isAuthor} data={boardDetail} />
      </div>
    </div>
  );
};
