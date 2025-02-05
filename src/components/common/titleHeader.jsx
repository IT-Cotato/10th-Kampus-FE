import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';

export const TitleHeader = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between h-16 p-4 border-b-[.0313rem] border-neutral-border-30">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={() => navigate(-1)}
        className="cursor-pointer w-[1.25rem] h-[1.25rem]"
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{text}</span>
      <div className="w-[1.25rem] h-[1.25rem]" />
    </div>
  );
};
