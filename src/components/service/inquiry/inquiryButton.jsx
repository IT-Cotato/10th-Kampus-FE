import arrow from '@/assets/imgs/arrowLine.svg';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const InquiryButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center gap-3 px-4 py-1 border-2 rounded-[.625rem] border-box text-neutral-title border-primary-base"
      onClick={() => navigate(`./${path.mypage.service.writeInquiry}`)}
    >
      <span className="flex">Go to 1:1 inquiry</span>
      <img src={arrow} alt="arrow" className="-rotate-90 h-[.375rem]" />
    </button>
  );
};
