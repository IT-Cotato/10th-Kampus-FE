import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import menubar from '@/assets/imgs/menubar.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BlockModal } from '@/components/chat/blockModal';
import { MuteModal } from '@/components/chat/muteModal';
import { LeaveModal } from '@/components/chat/leaveModal';
import { ChatMenu } from '@/components/chat/chatMenu';

export const RoomHeader = ({ text }) => {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isBlockModal, setIsBlockModal] = useState(false);
  const [isMuteModal, setIsMuteModal] = useState(false);
  const [isLeaveModal, setIsLeaveModal] = useState(false);

  const handleMuteClick = () => {
    setIsOpenMenu(false);
    setIsMuteModal(true);
    // 알림 안받기 기능 추가 예정
  };

  return (
    <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={() => navigate(-1)}
        className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{text}</span>
      <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <img src={menubar} alt="chat menu" />
      </button>
      {isOpenMenu && (
        <ChatMenu
          setIsOpenMenu={setIsOpenMenu}
          setIsBlockModal={setIsBlockModal}
          setIsMuteModal={setIsMuteModal}
          setIsLeaveModal={setIsLeaveModal}
        />
      )}
      <BlockModal
        isOpen={isBlockModal}
        onClose={() => setIsBlockModal(false)}
      />
      <MuteModal isOpen={isMuteModal} onClose={() => setIsMuteModal(false)} />
      <LeaveModal isOpen={isLeaveModal} onClose={() => setIsMuteModal(false)} />
    </div>
  );
};
