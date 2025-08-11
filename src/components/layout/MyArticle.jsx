import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import { PATH } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleHeader } from '../common/titleHeader';

export const MyArticle = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    {
      id: 0,
      text: 'My Articles',
      path: PATH.MYPAGE.COMMUNITY.ARTICLE.ARTICLES,
    },
    {
      id: 1,
      text: 'My Comments',
      path: PATH.MYPAGE.COMMUNITY.ARTICLE.COMMENTS,
    },
    {
      id: 2,
      text: 'Market',
      path: PATH.MYPAGE.COMMUNITY.ARTICLE.MARKET,
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <TitleHeader text="My Article" />
      <div className="flex w-full flex-row justify-start gap-[0.625rem] p-4">
        {menu.map((item) => (
          <ButtonRound
            key={item.id}
            theme={`${pathname.includes(item.path) ? BUTTON_THEMES.PRIMARY : BUTTON_THEMES.DISABLED}`}
            text={item.text}
            size="long"
            onClick={() => navigate(`./${item.path}`, { replace: true })}
          />
        ))}
      </div>
      <div className="flex w-full flex-1 flex-col px-4">{children}</div>
    </div>
  );
};
