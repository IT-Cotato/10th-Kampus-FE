import { useNavigate } from 'react-router-dom';
import LeftArrow from '@/assets/imgs/icon/left-arrow.svg?react';

const BackButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };
  return (
    <LeftArrow
      className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      role="button"
      aria-label="back button"
      onClick={handleBackClick}
    />
  );
};

export default BackButton;
