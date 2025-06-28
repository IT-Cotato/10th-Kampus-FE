import { ErrorBoundary } from 'react-error-boundary';
import { getErrorPayload } from '@/utils/errorHandler';
import { Player } from '@lottiefiles/react-lottie-player';
import errorAnimation from '@/assets/lottie/error.json';
import {
  ButtonRound,
  BUTTON_THEMES,
  BUTTON_SIZES,
} from '@/components/common/ButtonRound';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function ApiFallback({ error, resetErrorBoundary }) {
  const { code, message, status } = getErrorPayload(error);

  return (
    <div className="mx-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl mb-3 font-extrabold text-red-600">
        Error Occurred!
      </h2>
      <p className="mb-4 text-base text-gray-800">
        We apologize for the inconvenience. Please try again later.
      </p>
      <div className="flex flex-row items-center justify-center">
        <Player src={errorAnimation} loop autoplay speed={1} className="h-16" />
        <p className="text-xs text-left text-gray-500">
          (HTTP {status}) {code}
          <br />
          {message}
        </p>
      </div>
      <ButtonRound
        text="Retry"
        size={BUTTON_SIZES.SHORT}
        onClick={resetErrorBoundary}
        theme={BUTTON_THEMES.BASE}
      />
    </div>
  );
}

export function ApiErrorBoundary({ children }) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary onReset={reset} fallbackRender={ApiFallback}>
      {children}
    </ErrorBoundary>
  );
}
