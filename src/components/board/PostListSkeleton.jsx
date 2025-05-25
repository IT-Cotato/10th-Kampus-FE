export const PostListSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3 pb-3 pt-4">
      <div className="flex w-full justify-between gap-3">
        <div className="relative flex w-full flex-col">
          <div className="flex w-full gap-3">
            <div className="flex w-full flex-col gap-2">
              {/* 제목 Skeleton */}
              <div className="h-6 w-3/4 animate-pulse rounded-md bg-neutral-disabled" />
              {/* 내용 Skeleton */}
              <div className="h-4 w-full animate-pulse rounded-md bg-neutral-disabled" />
              <div className="h-4 w-4/6 animate-pulse rounded-md bg-neutral-disabled" />
            </div>
            {/* 썸네일 Skeleton */}
            <div className="h-20 w-20 flex-shrink-0 animate-pulse rounded-md bg-neutral-disabled" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-[0.375rem]">
          {/* 좋아요, 댓글, 시간 Skeleton */}
          <div className="h-4 w-7 animate-pulse rounded-md bg-neutral-disabled" />
          <div className="h-4 w-7 animate-pulse rounded-md bg-neutral-disabled" />
          <div className="h-4 w-16 animate-pulse rounded-md bg-neutral-disabled" />
        </div>
        {/* 번역 버튼 Skeleton */}
        <div className="h-5 w-5 animate-pulse rounded-md bg-neutral-disabled" />
      </div>
    </div>
  );
};
