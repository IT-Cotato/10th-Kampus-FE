import { DraftDeleteModal } from '@/components/board/draft/DraftDeleteModal';
import { DraftBox } from '@/components/board/draft/DraftBox';
import { DraftHeader } from '@/components/board/draft/DraftHeader';
import { Loading } from '@/components/common/Loading';
import KampusLogo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { useState } from 'react';
import { useGetDraftList } from '@/state/query/post/useGetDraftList';
import { useDeleteAllDraft } from '@/state/mutation/board/useDeleteAllDraft';
import { useDeleteSelectedDraft } from '@/state/mutation/board/useDeleteSelectedDraft';
import { useSnackbarStore } from '@/stores/useSnackbarStore';

export const Draft = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] =
    useState(false);
  const { showSnackbar } = useSnackbarStore();

  const { data: getDrafts, isLoading: draftLoading } = useGetDraftList();

  const { mutate: deleteAllDraftMutate } = useDeleteAllDraft({
    showDeleteAllSuccessSnackbar: () =>
      showSnackbar(
        `All ${getDrafts?.totalCount} draft posts\nhas been successfully deleted.`,
      ),
    onSettledCallback: () => {
      setIsEditMode(false);
      setIsDeleteAllModalOpen(false);
      setSelectedDrafts([]);
    },
  });

  const { mutate: deleteSelectedDraftMutate } = useDeleteSelectedDraft({
    showDeleteSuccessSnackbar: () =>
      showSnackbar('The selected draft posts\nhas been successfully deleted.'),
    onSettledCallback: () => {
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
              {getDrafts?.tempPosts?.map((draft) => (
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
              <span>There&apos;s nothing you&apos;ve written!</span>
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
        <DraftDeleteModal
          total={getDrafts?.totalCount}
          onClose={() => setIsDeleteAllModalOpen(false)}
          onConfirm={deleteAllDraftMutate}
          type="all"
        />
      )}
      {isDeleteSelectedModalOpen && selectedDrafts.length !== 0 && (
        <DraftDeleteModal
          total={selectedDrafts.length}
          onClose={() => setIsDeleteSelectedModalOpen(false)}
          onConfirm={() => deleteSelectedDraftMutate(selectedDrafts)}
          type="selected"
        />
      )}
    </main>
  );
};
