import { ErrorBoundary } from 'react-error-boundary';
import { Player } from '@lottiefiles/react-lottie-player';
import errorAnimation from '@/assets/lottie/error.json';
import {
  ButtonRound,
  BUTTON_THEMES,
  BUTTON_SIZES,
} from '@/components/common/ButtonRound';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export function ApiFallback({ resetErrorBoundary }) {
  return (
    <div className="mx-4 flex flex-col items-center justify-center">
      <Player src={errorAnimation} loop autoplay speed={1} className="h-16" />
      <h2 className="text-2xl mb-3 font-extrabold text-red-600">
        Error Occurred!
      </h2>
      <p className="mb-4 text-base text-gray-800">
        We apologize for the inconvenience. Please try again later.
      </p>
      <ButtonRound
        text="Retry"
        size={BUTTON_SIZES.SHORT}
        onClick={resetErrorBoundary}
        theme={BUTTON_THEMES.BASE}
      />
    </div>
  );
}

export function ApiErrorBoundary({ children, fallbackRender = ApiFallback }) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} fallbackRender={fallbackRender}>
      {children}
    </ErrorBoundary>
  );
}
