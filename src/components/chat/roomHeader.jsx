import menubar from '@/assets/imgs/icon/menubar.svg';
import { useState } from 'react';
import { BlockModal } from '@/components/chat/blockModal';
import { LeaveModal } from '@/components/chat/leaveModal';
import { ChatMenu } from '@/components/chat/chatMenu';
import { StateChangeAnimate } from '@/components/common/StateChangeAnimate';
import BackButton from '../common/BackButton';

export const RoomHeader = ({ text, setChatroomId, setMessages }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isLeaveModal, setIsLeaveModal] = useState(false);
  const [isMuteModal, setIsMuteModal] = useState(false);

  return (
    <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
      <BackButton
        onClick={() => {
          setChatroomId(null);
          setMessages([]);
        }}
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{text}</span>
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
  );
};
