import { ButtonRound } from '@/components/common/ButtonRound';
import { path } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleHeader } from '../common/titleHeader';

export const BlockingManagement = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: 'Chat', path: path.mypage.block.chat },
    { id: 1, text: 'Secondhand', path: path.mypage.block.secondhand },
  ];

  return (
    <div className="flex flex-col w-full">
      <TitleHeader text="Blocking Management" />
      <div className="flex flex-col w-full px-4 pt-12 pb-3">
        <div className="gap-[0.625rem] flex justify-start">
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
      </div>
      <div className="flex flex-col flex-1 w-full p-4">{children}</div>
    </div>
  );
};
