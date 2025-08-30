import { useEffect } from 'react';
import { ModalPortal } from './Modal';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { cn } from '@/utils/cn';

const ANIMATE_TIME = 1500;

const SnackBar = () => {
  const { message, hideSnackbar } = useSnackbarStore();

  useEffect(() => {
    const timer = setTimeout(() => {}, ANIMATE_TIME);
    return () => clearTimeout(timer);
  }, [ANIMATE_TIME, hideSnackbar]);

  if (!message) return null;

  return (
    <ModalPortal>
      <div
        className={cn('pointer-events-none modal-layout', '!bg-transparent')}
      >
        <div
          className="absolute z-30 mx-5 flex animate-fadeInOut items-center justify-center whitespace-break-spaces break-words rounded-lg bg-neutral-70 bg-opacity-30 px-4 py-3 text-center text-white"
          style={{ animationDuration: `${ANIMATE_TIME}ms` }}
          onAnimationEnd={() => hideSnackbar()}
          onClick={(e) => e.stopPropagation()}
        >
          {message}
        </div>
      </div>
    </ModalPortal>
  );
};

export default SnackBar;
