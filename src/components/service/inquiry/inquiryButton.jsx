import arrow from '@/assets/imgs/arrowLine.svg';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const InquiryButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="border-box flex items-center gap-3 rounded-[.625rem] border-2 border-primary-base px-4 py-1 text-neutral-title"
      onClick={() => navigate(`./${path.mypage.service.writeInquiry}`)}
    >
      <span className="flex">Go to 1:1 inquiry</span>
      <img src={arrow} alt="arrow" className="h-[.375rem] -rotate-90" />
    </button>
  );
};
