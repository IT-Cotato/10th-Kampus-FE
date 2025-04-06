import { getDraftList } from '@/apis/board/getDraftList.api';
import { DraftBox } from '@/components/board/draft/DraftBox';
import { DraftHeader } from '@/components/board/draft/DraftHeader';
import { Loading } from '@/components/common/Loading';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const Draft = () => {
  const [total, setTotal] = useState(0);

  const {
    data: getDrafts,
    isSuccess: draftSuccess,
    isLoading: draftLoading,
    error: draftError,
  } = useQuery({
    queryFn: () => getDraftList({ page: 1 }),
    queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
  });

  return (
    <main className="flex w-full flex-1 flex-col">
      <DraftHeader />
      {draftLoading ? (
        <section className="flex flex-1 items-center justify-center">
          <Loading />
        </section>
      ) : (
        <section className="flex h-full w-full flex-col gap-6 px-4 py-2">
          <span className="flex text-neutral-border-50">
            Total {getDrafts?.totalCount === 0 ? '00' : getDrafts?.totalCount}
          </span>
          <ul className="flex flex-col divide-y-[0.5px]">
            {getDrafts?.draftPosts.map((draft) => (
              <DraftBox
                key={draft.draftId}
                title={draft.title}
                content={draft.content}
                thumbnailUrl={draft.thumbnailUrl}
                createdTime={draft.createdTime}
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};
