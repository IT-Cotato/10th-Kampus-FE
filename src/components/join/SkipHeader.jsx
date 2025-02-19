import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { SkipButton } from '@/components/join/skipButtonShadow';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
export const SkipHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-16 px-4">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={() => navigate(-1)}
        className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      />
      <SkipButton navigateTo={`../../${path.home}`} />
    </div>
  );
};
