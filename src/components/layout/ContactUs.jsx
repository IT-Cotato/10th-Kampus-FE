import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import { TitleHeader } from '@/components/common/titleHeader';
import { path } from '@/routes/path';
import { useLocation, useNavigate } from 'react-router-dom';

export const ContactUs = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const menu = [
    { id: 0, text: 'FAQ', path: path.mypage.service.faq },
    { id: 1, text: '1:1 Inquiry', path: path.mypage.service.inquiry },
    { id: 2, text: 'Notice', path: path.mypage.service.notice },
  ];

  return (
    <div className="flex flex-col w-full">
      <TitleHeader text="Contact Us" />
      <div className="flex flex-col w-full px-4 pt-12 pb-3">
        <div className="flex justify-center gap-[0.625rem]">
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
      </div>
      <div className="flex flex-col flex-1 w-full p-4">{children}</div>
    </div>
  );
};
