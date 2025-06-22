import arrowLeft from '@/assets/imgs/navIcon/arrowLeft.svg';
import { SkipButton } from '@/components/join/skipButton.jsx';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
export const SkipHeader = ({ isInitialAuthFlow = false }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-16 items-center justify-between px-4">
      <img
        src={arrowLeft}
        alt="back button"
        onClick={() => navigate(-1)}
        className="h-[1.25rem] w-[1.25rem] cursor-pointer"
      />
      {isInitialAuthFlow && <SkipButton navigateTo={`../../${path.home}`} />}
    </div>
  );
};
