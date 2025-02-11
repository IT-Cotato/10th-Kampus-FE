import { ButtonRound } from '@/components/common/ButtonRound';
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
    <div className="flex w-full flex-col">
      <TitleHeader text="Contact Us" />
      <div className="flex w-full flex-col px-4 pb-3 pt-12">
        <div className="flex justify-center gap-[0.625rem]">
          {menu.map((item) => (
            <ButtonRound
              key={item.id}
              theme={`${pathname.includes(item.path) ? 'primary' : 'disabled'}`}
              text={item.text}
              width="long"
              height="small"
              onClick={() => navigate(`./${item.path}`, { replace: true })}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col p-4">{children}</div>
    </div>
  );
};
