import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { useNavigate } from 'react-router-dom';

export const TitleHeader = (props) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (props.onClick) {
      // onClick 함수가 전달되었으면 호출
      props.onClick();
    } else {
      navigate(-1);
    }
  }

  return (
    <div className="flex h-16 flex-row items-center justify-between border-b-[.0313rem] border-neutral-border-30 p-4">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={handleBackClick}
        className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      />
      <span className="mx-auto text-pageTitle text-neutral-title">{props.text}</span>
      <div className="h-[1.25rem] w-[1.25rem]" />
    </div>
  );
};
