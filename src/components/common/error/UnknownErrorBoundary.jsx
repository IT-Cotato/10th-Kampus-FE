import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import { getErrorPayload } from '@/utils/errorHandler';
import { ErrorBoundary } from 'react-error-boundary';
import bgErrorAnimation from '@/assets/lottie/bgError.json';
import { Player } from '@lottiefiles/react-lottie-player';

function UnknownFallback({ error, resetErrorBoundary }) {
  const { code, message, status } = getErrorPayload(error);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <Player
        src={bgErrorAnimation}
        loop
        autoplay
        speed={1}
        className="absolute inset-0 z-0 h-full w-full opacity-70"
      />
      <div className="relative z-10 mx-auto flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-10 p-6 text-center shadow-xl">
        <h2 className="text-2xl mb-3 font-extrabold text-red-600">
          Error Occurred!
        </h2>
        <p className="mb-4 text-base text-gray-800">
          We apologize for the inconvenience.
          <br />
          Please try again later.
        </p>
        <p className="text-xs mb-6 break-all text-gray-500">
          (HTTP {status})
          <br />
          {code}:{message}
        </p>
        <ButtonRound
          text="Retry"
          onClick={resetErrorBoundary}
          theme={BUTTON_THEMES.BASE}
        />
      </div>
    </div>
  );
}

export function UnknownErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      fallbackRender={UnknownFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
