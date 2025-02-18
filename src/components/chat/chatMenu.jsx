import reportIcon from '@/assets/imgs/reportIcon.svg';
import blockIcon from '@/assets/imgs/postBlock.svg';
import muteIcon from '@/assets/imgs/muteIcon.svg';
import deleteIcon from '@/assets/imgs/delete.svg';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { useState } from 'react';
import {
  startAnimation,
  StateChangeAnimate,
} from '@/components/common/StateChangeAnimate';

export const ChatMenu = ({
  setIsOpenMenu,
  setIsBlockModal,
  setIsLeaveModal,
  setIsMuteModal,
}) => {
  const navigate = useNavigate();

  const handleMuteClick = () => {
    setIsOpenMenu(false);
    setIsMuteModal(true);
    startAnimation(setIsMuteModal);
    // 알림 안받기 기능 추가 예정
  };

  return (
    <div className="absolute right-4 top-12 w-[12.25rem] space-y-2 rounded-[.625rem] bg-white px-4 py-3 text-neutral-title shadow-navbar">
      <div
        className="flex items-center justify-between"
        onClick={() => navigate(path.chatList.report)}
      >
        <p>Report</p>
        <img src={reportIcon} alt="report" />
      </div>
      <div
        className="flex items-center justify-between"
        onClick={() => {
          setIsOpenMenu(false);
          setIsBlockModal(true);
        }}
      >
        <p>Block</p>
        <img src={blockIcon} alt="block" />
      </div>
      <div
        className="flex items-center justify-between"
        onClick={handleMuteClick}
      >
        <p>Mute</p>
        <img src={muteIcon} alt="mute" />
      </div>
      <div
        className="flex items-center justify-between"
        onClick={() => {
          setIsOpenMenu(false);
          setIsLeaveModal(true);
        }}
      >
        <p className="text-primary-red">Leave chat</p>
        <img src={deleteIcon} alt="delete" />
      </div>
    </div>
  );
};
