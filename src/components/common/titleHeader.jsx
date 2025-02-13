import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';

export const TitleHeader = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={() => navigate(-1)}
        className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{text}</span>
      <div className="h-[1.25rem] w-[1.25rem]" />
    </div>
  );
};
