import {
  deleteAllDraft,
  deleteSelectedDraft,
} from '@/apis/board/deleteDrafts.api';
import { getDraftList } from '@/apis/board/getDraftList.api';
import {
  DeleteAllDraftModal,
  DeleteSelectedDraftModal,
} from '@/components/board/draft/DeleteDraftModal';
import { DraftBox } from '@/components/board/draft/DraftBox';
import { DraftHeader } from '@/components/board/draft/DraftHeader';
import { Loading } from '@/components/common/Loading';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KampusLogo from '@/assets/imgs/kampusLogo.svg?react';
import { useState } from 'react';

export const Draft = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] =
    useState(false);
  const queryClient = useQueryClient();

  const {
    data: getDrafts,
    isSuccess: draftSuccess,
    isLoading: draftLoading,
    error: draftError,
  } = useQuery({
    queryFn: () => getDraftList({ page: 1 }),
    queryKey: [QUERY_KEYS.GET_DRAFT_LIST],
  });

  const { mutate: deleteAllDraftMutate } = useMutation({
    mutationFn: () => deleteAllDraft(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_DRAFT_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      console.log('삭제 실패');
    },
    onSettled: () => {
      setIsEditMode(false);
      setIsDeleteAllModalOpen(false);
      setSelectedDrafts([]);
    },
  });

  const { mutate: deleteSelectedDraftMutate } = useMutation({
    mutationFn: (selectedDrafts) =>
      deleteSelectedDraft({ draftPostIds: selectedDrafts }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_DRAFT_LIST] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      console.log('삭제 실패');
    },
    onSettled: () => {
      setIsEditMode(false);
      setIsDeleteSelectedModalOpen(false);
      setSelectedDrafts([]);
    },
  });

  return (
    <main className="flex w-full flex-1 flex-col pt-16">
      <DraftHeader isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      {draftLoading ? (
        <section className="flex flex-1 items-center justify-center">
          <Loading />
        </section>
      ) : (
        <section className="flex h-full w-full flex-col gap-2 px-4 py-2">
          <span className="flex text-neutral-border-50">
            {isEditMode
              ? `Selected ${selectedDrafts?.length === 0 ? '00' : selectedDrafts?.length}`
              : `Total ${getDrafts?.totalCount === 0 ? '00' : getDrafts?.totalCount}`}
          </span>
          {getDrafts?.totalCount !== 0 ? (
            <ul className="flex flex-1 flex-col divide-y-[0.5px] divide-neutral-border-30">
              {getDrafts?.items?.map((draft) => (
                <DraftBox
                  key={draft.tempPostId}
                  draft={draft}
                  isEditMode={isEditMode}
                  selectedDrafts={selectedDrafts}
                  setSelectedDrafts={setSelectedDrafts}
                />
              ))}
            </ul>
          ) : (
            <span className="flex flex-1 -translate-y-12 flex-col items-center justify-center gap-2 text-center text-neutral-disabled">
              <KampusLogo className="h-12" />
              <span>There's nothing you've written!</span>
            </span>
          )}
        </section>
      )}
      {/* Delete */}
      {isEditMode && (
        <article className="fixed bottom-[32px] flex w-full max-w-[512px] px-4">
          <div className="flex w-full divide-x divide-neutral-border-30 rounded-[.625rem] border border-neutral-border-30 bg-white py-3 text-small text-neutral-title shadow-base">
            <button
              type="button"
              className="w-full px-[18px] py-[6px]"
              onClick={() => setIsDeleteAllModalOpen(true)}
            >
              Delete all
            </button>
            <button
              type="button"
              className="w-full px-[18px] py-[6px]"
              onClick={() => setIsDeleteSelectedModalOpen(true)}
            >
              Delete selected
            </button>
          </div>
        </article>
      )}
      {/* Modal */}
      {isDeleteAllModalOpen && (
        <DeleteAllDraftModal
          total={getDrafts?.totalCount}
          onClose={() => setIsDeleteAllModalOpen(false)}
          deleteAll={deleteAllDraftMutate}
        />
      )}
      {isDeleteSelectedModalOpen && selectedDrafts.length !== 0 && (
        <DeleteSelectedDraftModal
          total={selectedDrafts.length}
          onClose={() => setIsDeleteSelectedModalOpen(false)}
          deleteSelected={() => deleteSelectedDraftMutate(selectedDrafts)}
        />
      )}
    </main>
  );
};
