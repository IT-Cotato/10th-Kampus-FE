import { SkipButton } from '@/components/join/skipButton.jsx';
import BackButton from '@/components/common/BackButton';
import { PATH } from '@/routes/path';

export const SkipHeader = ({ isInitialAuthFlow = false }) => {
  return (
    <div className="flex h-16 items-center justify-between px-4">
      <BackButton />
      {isInitialAuthFlow && <SkipButton navigateTo={`../../${PATH.HOME}`} />}
    </div>
  );
};
