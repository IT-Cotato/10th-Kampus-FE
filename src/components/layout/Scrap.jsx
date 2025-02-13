import { ButtonRound } from '@/components/common/ButtonRound';
import { path } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleHeader } from '../common/titleHeader';

export const Scrap = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: 'Community', path: path.mypage.community.scrap.community},
    { id: 1, text: 'Secondhand', path: path.mypage.community.scrap.secondhand },
  ];

  return (
    <div className="flex flex-col w-full">
      <TitleHeader text="Scrap" />
      <div className="flex flex-row w-full px-4 pt-12 pb-6 gap-[0.625rem] justify-start">
          {menu.map((item) => (
            <ButtonRound
              key={item.id}
              theme={`${pathname.includes(item.path) ? 'primary' : 'disabled'}`}
              text={item.text}
              width="base"
              height="small"
              onClick={() => navigate(`./${item.path}`, { replace: true })}
            />
          ))}
      </div>
      <div className="flex flex-col flex-1 w-full px-4">{children}</div>
    </div>
  );
};
