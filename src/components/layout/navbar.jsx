import home from '@/assets/imgs/navIcon/Home.svg';
import homeActive from '@/assets/imgs/navIcon/homeActive.svg';
import board from '@/assets/imgs/navIcon/board.svg';
import boardActive from '@/assets/imgs/navIcon/boardActive.svg';
import market from '@/assets/imgs/navIcon/market.svg';
import marketActive from '@/assets/imgs/navIcon/marketActive.svg';
import chat from '@/assets/imgs/navIcon/chat.svg';
import chatActive from '@/assets/imgs/navIcon/chatActive.svg';
import my from '@/assets/imgs/navIcon/my.svg';
import myActive from '@/assets/imgs/navIcon/myActive.svg';
import { cn } from '@/utils/cn';
import { useLocation, useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { useEffect } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 0,
      path: path.home,
      icon: home,
      activeIcon: homeActive,
      label: 'Home',
    },
    {
      id: 1,
      path: path.board.base,
      icon: board,
      activeIcon: boardActive,
      label: 'Board',
    },
    {
      id: 2,
      path: path.market.base,
      icon: market,
      activeIcon: marketActive,
      label: 'Market',
    },
    {
      id: 3,
      path: path.chatList.base,
      icon: chat,
      activeIcon: chatActive,
      label: 'Chat',
    },
    {
      id: 4,
      path: path.mypage.base,
      icon: my,
      activeIcon: myActive,
      label: 'My',
    },
  ];

  return (
    <div className="h-[6.4375rem] bg-white rounded-t-2xl shadow-navbar flex flex-row items-center justify-between px-[1.875rem] gap-[1.875rem]">
      {navItems.map((item) => {
        const urlActive = location.pathname.includes(item.path);
        return (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <img
              src={urlActive ? item.activeIcon : item.icon}
              alt={item.label}
              className="w-[1.875rem] h-[1.875rem]"
            />
            <span
              className={cn('text-small', {
                'text-neutral-icon': !urlActive,
                'text-neutral-title': urlActive,
              })}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
