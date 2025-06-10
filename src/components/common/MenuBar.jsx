import menubar from '@/assets/imgs/menubar.svg';
import pin from '@/assets/imgs/pin.svg';
import chat from '@/assets/imgs/startChat.svg';
import block from '@/assets/imgs/postBlock.svg';
import report from '@/assets/imgs/reportIcon.svg';
import link from '@/assets/imgs/exportLink.svg';
import Pencil from '@/assets/imgs/pencil.svg?react';
import postDelete from '@/assets/imgs/delete.svg';
import { deletePost } from '@/apis/board/handlePost.api';
import { useState, useRef, useEffect } from 'react';
import { StateChangeAnimate, startAnimation } from './StateChangeAnimate';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import {
  addBoardFavorite,
  deleteBoardFavorite,
} from '@/apis/board/toggleBoardFavorite.api';
import { postChat } from '@/apis/chat/chatRoom.api';
import { Modal } from './Modal';
import { useDeleteMarketProduct } from '@/state/mutation/market/useDeleteMarketProduct';
export const BoardMenuBar = ({ isAuthor = false, data, isMarket = false }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { boardId, postId, productId } = useParams();
  const modalRef = useRef(null);
  const [openModal, setOpenModal] = useState(false); // 메뉴바 모달 창
  const [pinAni, setPinAni] = useState(false); // 핀 애니메이션 상태
  const [urlAni, setUrlAni] = useState(false); // URL 복사 애니메이션 상태
  const [copyState, setCopyState] = useState(true); // 복사 성공여부
  const [popupState, setPopupState] = useState({
    chat: false,
    block: false,
    delete: false,
  });
  const popupData = {
    chat: {
      title: 'Chat with this account',
      text: '',
      leftButton: 'Cancel',
      rightButton: 'Chat',
    },
    block: {
      title: 'Block this account?',
      text: 'All posts by the writer will be not displayed. You cannot unlock them.',
      leftButton: 'Cancel',
      rightButton: 'Block',
    },
    delete: {
      title: 'Delete this post?',
      text: 'Deleted posts cannot be recovered.',
      leftButton: 'Cancel',
      rightButton: 'Ok',
    },
  };
  const { mutate: removePost } = useMutation({
    mutationFn: () => deletePost({ postId: postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIST, boardId],
      });
      navigate(-1);
    },
  });
  const { mutate: removeProduct } = useDeleteMarketProduct();
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () =>
      data.isFavorite
        ? deleteBoardFavorite({ boardId })
        : addBoardFavorite({ boardId }),
    onMutate: async () => {
      startMenuAni(setPinAni);
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
      });
      const previousBoardDetail = queryClient.getQueryData([
        QUERY_KEYS.GET_BOARD_DETAIL,
        boardId,
      ]);
      // 낙관적 업데이트 적용
      queryClient.setQueryData(
        [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
        (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, isFavorite: !oldData.isFavorite };
        },
      );
      return { previousBoardDetail }; // 에러 시 롤백 값 주기
    },
    onError: (err, variables, context) => {
      // 에러시 롤백
      if (context?.previousBoardDetail) {
        queryClient.setQueryData(
          [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
          context.previousBoardDetail,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_BOARD_DETAIL, boardId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PUBLIC_BOARD_LIST],
      });
    },
  });

  const { mutate: createChatRoom } = useMutation({
    mutationKey: [QUERY_KEYS.POST_CHAT_ROOM],
    mutationFn: () => postChat({ postId }),
    onSuccess: () => {
      navigate(path.chatList.base);
    },
    onError: (error) => {
      if (error.response.data.code === 'CHAT-002') {
        navigate(path.chatList.base);
      }
    },
  });

  const startMenuAni = (setAni) => {
    // 애니메이션
    setOpenModal(false);
    startAnimation(setAni);
  };
  const togglePopup = (type) => {
    setOpenModal(false);
    setPopupState((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  const handleRightButton = (type) => {
    // 팝업 오른쪽 버튼
    if (type === 'delete') {
      if (postId !== undefined) removePost();
      if (productId !== undefined) removeProduct(productId);
    }
    if (type === 'chat') {
      createChatRoom();
    }
  };
  const copyUrl = async () => {
    const nowUrl = window.location.href;
    await navigator.clipboard
      .writeText(nowUrl)
      .then(() => {
        setCopyState(true);
        startMenuAni(setUrlAni);
      })
      .catch(() => {
        setCopyState(false);
        startMenuAni(setUrlAni);
      });
  };

  const handleEdit = () => {
    if (postId) navigate(path.board.specific.edit);
    if (productId) navigate(path.market.edit);
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
    <div ref={modalRef} className="h-5 w-5 cursor-pointer text-neutral-title">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(!openModal);
        }}
      >
        <img src={menubar} alt="Menu Bar" className="h-5 w-5" />
      </button>
      {openModal &&
        !postId &&
        !isMarket && ( // 게시글 리스트 부분
          <div
            className="absolute right-4 top-12 flex items-center justify-center gap-3 rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-3 shadow-md"
            onClick={() => toggleFavorite()}
          >
            <p className="text-base">
              {data && !data.isFavorite
                ? 'Add to Bookmark'
                : 'Remove the Bookmark'}
            </p>
            {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
            <img src={pin} className="h-5 w-5 -rotate-90" />
          </div>
        )}
      {openModal &&
        (postId || productId) &&
        !isAuthor && ( // 상세 게시글 중 다른 사람 게시글
          <div className="absolute right-4 top-12 flex min-w-48 flex-col rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-1 py-1 text-base shadow-md">
            {/* 중고거래는 메뉴바에 채팅 보내기 항목 없음 */}
            {!productId && (
              <div
                className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
                onClick={() => togglePopup('chat')}
              >
                <p>Send a message</p>
                <img src={chat} alt="Start a Chat" className="h-4 w-4" />
              </div>
            )}
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() => copyUrl()}
            >
              <p>Copy URL</p>
              <img src={link} alt="Copy URL" className="h-4 w-4" />
            </div>
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() =>
                navigate(path.board.specific.report, {
                  state: { postId: postId },
                })
              } // 신고 페이지로 이동
            >
              <p>Report</p>
              <img src={report} alt="Report" className="h-4 w-4" />
            </div>
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() => togglePopup('block')}
            >
              <p>Block</p>
              <img src={block} alt="Block" className="h-4 w-4" />
            </div>
          </div>
        )}
      {openModal &&
        (postId || productId) &&
        isAuthor && ( // 상세 게시글 중 내가 작성한 게시글
          <div className="absolute right-4 top-12 flex min-w-48 flex-col rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-1 py-1 text-base shadow-md">
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() => copyUrl()}
            >
              <p className="text-neutral-title">Copy URL</p>
              <img src={link} alt="" className="h-4 w-4" />
            </div>
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() => handleEdit()}
            >
              <p className="text-neutral-title">Edit</p>
              <Pencil className="h-4 w-4 text-black" />
            </div>
            <div
              className="flex items-center justify-between rounded-sm px-3 py-1 hover:bg-primary-5"
              onClick={() => togglePopup('delete')}
            >
              <p className="text-primary-red">Delete</p>
              <img
                src={postDelete}
                alt=""
                className="h-[1.125rem] w-[1.125rem]"
              />
            </div>
          </div>
        )}
      {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
      {pinAni && (
        <StateChangeAnimate
          state={!data.isFavorite}
          changeToTrueText="Pinned to the board"
          changeToFalseText="Unpinned from the board"
          onClose={() => setPinAni(false)}
        />
      )}
      {urlAni && (
        <StateChangeAnimate
          state={!copyState}
          changeToTrueText="URL copied successfully"
          changeToFalseText="URL copy failed"
          onClose={() => setUrlAni(false)}
        />
      )}
      {Object.entries(popupState).map(
        ([key, isOpen]) =>
          isOpen && (
            <Modal
              key={key}
              title={popupData[key].title}
              onClickLeft={() => togglePopup(key)}
              leftButton={popupData[key].leftButton}
              onClickRight={() => handleRightButton(key)}
              rightButton={popupData[key].rightButton}
              onClose={() => togglePopup(key)}
            >
              {popupData[key].text}
            </Modal>
          ),
      )}
    </div>
  );
};
