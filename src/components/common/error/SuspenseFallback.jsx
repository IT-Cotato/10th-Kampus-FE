import { Loading } from '@/components/common/Loading';
import { Suspense } from 'react';
import { ApiErrorBoundary } from '@/components/common/error/ApiErrorBoundary';

export function SuspenseFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loading />
      <span role="status" aria-live="polite">
        ⏳ 데이터 불러오는 중...
      </span>
    </div>
  );
}

export function ErrorWrapper({ children }) {
  return (
    <ApiErrorBoundary>
      <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
    </ApiErrorBoundary>
  );
}
