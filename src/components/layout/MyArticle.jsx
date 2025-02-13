import { ButtonRound } from '@/components/common/ButtonRound';
import { path } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleHeader } from '../common/titleHeader';

export const MyArticle = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: 'My Articles', path: path.mypage.community.article.articles},
    { id: 1, text: 'My Comments', path: path.mypage.community.article.comments },
  ];

  return (
    <div className="flex flex-col w-full">
      <TitleHeader text="My Article" />
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
