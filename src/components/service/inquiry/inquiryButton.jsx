import arrow from '@/assets/imgs/arrowLine.svg';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const InquiryButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center justify-center px-4 py-1 border-2 rounded-md text-neutral-title border-primary-base"
      onClick={() => navigate(path.mypage.service.inquiry)}
    >
      Go to 1:1 inquiry
      <img src={arrow} alt="arrow" className="-rotate-90 " />
    </button>
  );
};
