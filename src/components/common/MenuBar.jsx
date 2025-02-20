import menubar from '@/assets/imgs/menubar.svg';
import pin from '@/assets/imgs/pin.svg';
import chat from '@/assets/imgs/startChat.svg';
import block from '@/assets/imgs/postBlock.svg';
import report from '@/assets/imgs/reportIcon.svg';
import link from '@/assets/imgs/exportLink.svg';
import postDelete from '@/assets/imgs/delete.svg';
import { deletePost } from '@/apis/board/handlePost.api';
import { useState, useRef, useEffect } from 'react';
import { StateChangeAnimate, startAnimation } from './StateChangeAnimate';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Popup } from './popup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
export const BoardMenuBar = ({ isAuthor = false }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const { postId } = useParams();
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST, boardId] })
      navigate(-1);
    }
  })
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
  }
  const handleRightButton = (type) => {
    removePost();
  }
  const copyUrl = async () => {
    const nowUrl = window.location.href;
    await navigator.clipboard.writeText(nowUrl)
      .then(() => {
        setCopyState(true)
        startMenuAni(setUrlAni);
      })
      .catch(() => {
        setCopyState(false)
        startAnimation(setUrlAni)
      })
  }
  useEffect(() => {
    const handleOutSide = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    }
    if (openModal) {
      document.addEventListener('touchmove', handleOutSide);
      document.addEventListener('mousedown', handleOutSide);
    }
    return () => {
      document.removeEventListener('touchmove', handleOutSide);
      document.removeEventListener('mousedown', handleOutSide);
    }
  }, [openModal])
  return (
    <div ref={modalRef} className="h-5 w-5 cursor-pointer text-neutral-title">
      <button onClick={(e) => {
        e.stopPropagation()
        setOpenModal(!openModal)
      }}>
        <img src={menubar} alt="Menu Bar" className="h-5 w-5" />
      </button>
      {openModal &&
        !postId && ( // 게시글 리스트 부분
          <div
            className="absolute right-4 top-12 flex items-center justify-center gap-3 rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-3 shadow-md"
            onClick={() => startMenuAni(setPinAni)}
          >
            <p className="text-base">
              {!pinAni ? 'Add to Bookmark' : 'Remove the Bookmark'}
            </p>
            {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
            <img src={pin} className="w-5 h-5 -rotate-90" />
          </div>
        )}
      {openModal &&
        postId &&
        !isAuthor && ( // 상세 게시글 중 다른 사람 게시글
          <div className="absolute right-4 top-12 flex min-w-48 flex-col rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-2 text-base text-neutral-title shadow-md">
            <div
              className="flex items-center justify-between pb-1"
              onClick={() => togglePopup('chat')}
            >
              <p>Send a message</p>
              <img src={chat} alt="Start a Chat" className="w-4 h-4" />
            </div>
            <div
              className="flex items-center justify-between py-1"
              onClick={() => copyUrl()}
            >
              <p>Copy URL</p>
              <img src={link} alt="Copy URL" className="w-4 h-4" />
            </div>
            <div
              className="flex items-center justify-between py-1"
              onClick={() => navigate(path.board.specific.report, { state: { postId: postId } })} // 신고 페이지로 이동
            >
              <p>Report</p>
              <img src={report} alt="Report" className="w-4 h-4" />
            </div>
            <div
              className="flex items-center justify-between pt-1"
              onClick={() => togglePopup('block')}
            >
              <p>Block</p>
              <img src={block} alt="Block" className="w-4 h-4" />
            </div>
          </div>
        )}
      {openModal &&
        postId &&
        isAuthor && ( // 상세 게시글 중 내가 작성한 게시글
          <div className="absolute right-4 top-12 flex min-w-48 flex-col rounded-[0.625rem] border-[0.5px] border-[#D8D8D8] bg-white px-4 py-2 text-base shadow-md">
            <div
              className="flex items-center justify-between pb-1"
              onClick={() => copyUrl()}
            >
              <p className="text-neutral-title">Copy URL</p>
              <img src={link} alt="Copy URL" className="w-4 h-4" />
            </div>
            <div
              className="flex items-center justify-between pt-1"
              onClick={() => togglePopup('delete')}
            >
              <p className="text-primary-red">Delete</p>
              <img
                src={postDelete}
                alt="Delete a Post"
                className="h-[1.125rem] w-[1.125rem]"
              />
            </div>
          </div>
        )}
      {/** 이후 통신 시, 유저가 보고 있는 보드의 핀 여부에 따라 바꿔야함 */}
      {pinAni && (
        <StateChangeAnimate
          state={!pinAni}
          changeToTrueText="Pinned to the board"
          changeToFalseText="Unpinned from the board"
        />
      )}
      {urlAni && (
        <StateChangeAnimate
          state={!copyState}
          changeToTrueText="URL copied successfully"
          changeToFalseText="URL copy failed"
        />
      )}
      {Object.entries(popupState).map(([key, isOpen]) =>
        isOpen &&
        createPortal(
          <Popup
            key={key}
            title={popupData[key].title}
            text={popupData[key].text}
            onClickLeft={() => togglePopup(key)}
            leftButton={popupData[key].leftButton}
            onClickRight={() => handleRightButton(key)}
            rightButton={popupData[key].rightButton}
          />,
          document.getElementById('modal-root')
        )
      )}
    </div>
  );
};
