import { SkipButton } from '@/components/join/skipButton.jsx';
import { path } from '@/routes/path';
import BackButton from '@/components/common/BackButton';
export const SkipHeader = ({ isInitialAuthFlow = false }) => {
  return (
    <div className="flex h-16 items-center justify-between px-4">
      <BackButton />
      {isInitialAuthFlow && <SkipButton navigateTo={`../../${path.home}`} />}
    </div>
  );
};
