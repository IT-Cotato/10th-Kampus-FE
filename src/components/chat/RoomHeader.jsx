import menubar from '@/assets/imgs/icon/menubar.svg';
import { useState } from 'react';
import { BlockModal } from '@/components/chat/BlockModal';
import { LeaveModal } from '@/components/chat/LeaveModal';
import { ChatMenu } from '@/components/chat/ChatMenu';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import BackButton from '../common/BackButton';
import { useGetChatroom } from '@/state/query/chat/useGetChatroom';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

export const RoomHeader = ({ chatroomId, setChatroomId, setMessages }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isLeaveModal, setIsLeaveModal] = useState(false);
  const [isMuteModal, setIsMuteModal] = useState(false);
  const navigate = useNavigate();

  //방 정보
  const { data: roomData, isLoading } = useGetChatroom({
    chatroomId,
  });

  if (isLoading) {
    return (
      <div className="flex h-16 flex-row items-center justify-center border-b-[.0313rem] border-neutral-border-30 p-4">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
        <BackButton
          onClick={() => {
            setChatroomId(null);
            setMessages([]);
          }}
        />
        <span className="mx-auto text-pageTitle text-neutral-title">
          {roomData.postTitle}
        </span>
        <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <img src={menubar} alt="chat menu" />
        </button>
        {isOpenMenu && (
          <ChatMenu
            setIsOpenMenu={setIsOpenMenu}
            setIsBlockModal={setIsBlockModal}
            setIsLeaveModal={setIsLeaveModal}
            setIsMuteModal={setIsMuteModal}
          />
        )}
        <BlockModal
          isOpen={isBlockModal}
          onClose={() => setIsBlockModal(false)}
        />
        <LeaveModal
          isOpen={isLeaveModal}
          onClose={() => setIsLeaveModal(false)}
        />
        {isMuteModal && (
          <StateChangeAnimate
            state={isMuteModal}
            changeToTrueText={'Successfully muted'}
            changeToFalseText={'Successfully unmuted'}
          />
        )}
      </div>
      <div className="flex w-full flex-col items-start justify-center bg-neutral-bg-5 p-4 text-neutral-base">
        <p className="text-base">{roomData.boardName}</p>
        <p className="text-pageTitle text-neutral-title">{roomData.postName}</p>
        <button
          className="h-10 w-full rounded-lg border border-neutral-border-30 bg-white text-small"
          onClick={() => {
            navigate(
              `${PATH.BOARD.BASE}/${roomData.boardId}/${roomData.postId}`,
            );
          }}
        >
          Go to the article
        </button>
      </div>
    </div>
  );
};
