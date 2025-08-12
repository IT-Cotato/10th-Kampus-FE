import arrow from '@/assets/imgs/icon/arrow-line.svg';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const InquiryButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="border-box flex items-center gap-3 rounded-[.625rem] border-2 border-primary-base px-4 py-1 text-neutral-title"
      onClick={() => navigate(PATH.MYPAGE.SERVICE.WRITE_INQUIRY)}
    >
      <span className="flex">Go to 1:1 inquiry</span>
      <img src={arrow} alt="arrow" className="h-[.375rem] -rotate-90" />
    </button>
  );
};
