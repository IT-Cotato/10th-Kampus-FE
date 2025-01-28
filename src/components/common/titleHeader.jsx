import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const TitleHeader = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="h-16 flex flex-row p-[0.625rem] items-center justify-between">
      <img
        src={arrowLeft}
        alt="arrowLeft"
        onClick={() => navigate('../')}
        className="cursor-pointer w-[1.25rem] h-[1.25rem]"
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{text}</span>
      <div className="w-[1.25rem] h-[1.25rem]" />
    </div>
  );
};
