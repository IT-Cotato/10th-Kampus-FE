import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleHeader } from '../common/TitleHeader';

export const BlockingManagement = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: 'Chat', path: PATH.MYPAGE.BLOCK.CHAT },
    { id: 1, text: 'Market', path: PATH.MYPAGE.BLOCK.MARKET },
  ];

  return (
    <div className="flex w-full flex-col">
      <TitleHeader text="Blocking Management" />
      <div className="flex w-full flex-row justify-start gap-[0.625rem] px-4 pb-6 pt-12">
        {menu.map((item) => (
          <ButtonRound
            key={item.id}
            theme={`${pathname.includes(item.path) ? BUTTON_THEMES.PRIMARY : BUTTON_THEMES.DISABLED}`}
            text={item.text}
            size="short"
            onClick={() => navigate(`./${item.path}`, { replace: true })}
          />
        ))}
      </div>
      <div className="flex w-full flex-1 flex-col p-4">{children}</div>
    </div>
  );
};
