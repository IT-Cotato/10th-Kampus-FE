import HomeIcon from '@/assets/imgs/navIcon/home.svg?react';
import BoardIcon from '@/assets/imgs/navIcon/board.svg?react';
import MarketIcon from '@/assets/imgs/navIcon/market.svg?react';
import ChatIcon from '@/assets/imgs/navIcon/chat.svg?react';
import MyIcon from '@/assets/imgs/navIcon/my.svg?react';
import { cn } from '@/utils/cn';
import { useLocation, useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 0,
      path: path.home,
      icon: HomeIcon,
      label: 'Home',
    },
    {
      id: 1,
      path: path.board.base,
      icon: BoardIcon,
      label: 'Board',
    },
    {
      id: 2,
      path: path.market.base,
      icon: MarketIcon,
      label: 'Market',
    },
    {
      id: 3,
      path: path.chatList.base,
      icon: ChatIcon,
      label: 'Chat',
    },
    {
      id: 4,
      path: path.mypage.base,
      icon: MyIcon,
      label: 'My',
    },
  ];

  return (
    <div className="fixed bottom-0 z-50 flex h-[6.4375rem] w-full max-w-lg flex-row items-center justify-between gap-[1.875rem] rounded-t-2xl bg-white px-4 pb-[36px] pt-2 shadow-navbar">
      {navItems.map((item) => {
        const urlActive = location.pathname.includes(item.path);
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-between pt-[.125rem]"
            onClick={() => navigate(item.path)}
          >
            <IconComponent
              className={cn('h-[1.875rem] w-[1.875rem]', {
                'text-neutral-icon': !urlActive,
                'text-primary-base': urlActive,
              })}
            />
            <span
              className={cn('text-small', {
                'text-neutral-icon': !urlActive,
                'text-primary-base': urlActive,
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
