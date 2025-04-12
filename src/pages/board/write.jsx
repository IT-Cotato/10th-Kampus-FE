import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { TranslatePopup } from '@/components/board/write/TranslatePopup';
import { createPortal } from 'react-dom';
import { postWritePost } from '@/apis/board/postWritePost.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { writePostTranslate } from '@/apis/translate/writePostTranslate.api';
import {
  patchSaveDraft,
  postSaveDraft,
} from '@/apis/board/handleSaveDraft.api';
import { ReloadModal } from '@/components/board/draft/ReloadModal';

export const Write = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const { state } = useLocation();

  const {
    mutate: addPost,
    isPending: postPending,
    isError: postError,
  } = useMutation({
    mutationFn: (newPost) => postWritePost({ data: newPost }),
    onSuccess: (response) => {
      const createdPostId = response.postId;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] });
      navigate(`${path.board.base}/${boardId}/${createdPostId}`, {
        replace: true,
      });
    },
  });

  const {
    mutate: setTranslate,
    isPending: translatePending,
    isError: translateError,
  } = useMutation({
    mutationFn: (data) => writePostTranslate(data),
    onSuccess: (response) => {
      setTranslatedTitle(response.title);
      setTranslatedContent(response.content);
    },
  });

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const disabled = !title || !content;
  const saveDraftDisabled = !title && !content && uploadedFiles.length === 0;
  const [isReloadModalOpen, setIsReloadModalOpen] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('boardId', boardId);
    formData.append('title', translatedTitle ?? title);
    formData.append('content', translatedContent ?? content);

    if (selectedCategory) {
      formData.append('postCategory', selectedCategory);
    }

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append(`images`, file); // 각 파일을 개별적으로 추가
      });
    }
    addPost(formData);
  };

  const handleCancelTranslatePopup = () => {
    setIsPopup(false);
    setTranslatedTitle(null);
    setTranslatedContent(null);
  };

  const handleTranslateAndUpload = () => {
    setIsPopup(true);
    const buildData = () => {
      return {
        title: title,
        content: content,
        targetLanguageCode: 'EN-US',
      };
    };
    setTranslate({ data: buildData() });
  };

  const {
    mutate: saveDraft,
    isPending: saveDraftPending,
    isError: saveDraftError,
  } = useMutation({
    mutationFn: (draft) => postSaveDraft({ data: draft }),
    onSuccess: (response) => {
      setPostDraftId(response.postDraftId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_DRAFT_ID],
      });
    },
  });

  const {
    mutate: patchDraft,
    isPending: patchDraftPending,
    isError: patchDraftError,
  } = useMutation({
    mutationFn: (draft) =>
      patchSaveDraft({ data: draft, postDraftId: postDraftId }),
    onSuccess: (response) => {
      setPostDraftId(response.postDraftId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_DRAFT_ID],
      });
    },
  });

  // 임시저장 버튼 클릭 시
  const handleSaveDraft = async () => {
    const formData = new FormData();

    formData.append('boardId', boardId);
    formData.append('title', title);
    formData.append('content', content);

    if (selectedCategory) {
      formData.append('postCategory', selectedCategory);
    }

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append(`images`, file); // 각 파일을 개별적으로 추가
      });
    }

    if (!postDraftId) {
      // 임시저장
      saveDraft(formData);
    } else {
      // 임시저장 덮어쓰기
      patchDraft(formData);
    }
  };

  // 작성 중이던 글 있을 경우 경고, 아닐 경우 임시저장 목록 페이지로 바로 이동
  const handleClickReloadDrafts = () => {
    if (title !== '' || content !== '' || uploadedFiles.length !== 0) {
      setIsReloadModalOpen((prev) => !prev);
    } else {
      handleClickSavedDrafts();
    }
  };

  // 임시저장 목록 페이지로 이동
  const handleClickSavedDrafts = () => {
    navigate(`../../${path.board.specific.draft}`);
  };

  useEffect(() => {
    if (!state) {
      // 보드에서 Write 버튼 누르지 않고 다른 경로로 들어올 시 이전 기록으로 navigate
      navigate(-1);
    }
  }, [state, navigate]);

  if (!state) return null;
  const { boardName } = state;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid w-full grid-cols-3 items-center px-4 pb-3 pt-4">
        <button type="button">
          <X
            className="h-6 w-6 p-1 text-neutral-title"
            onClick={() => navigate(-1)}
          />
        </button>
        <span className="flex justify-center text-pageTitle text-neutral-title">
          Write
        </span>
        {/* 임시저장 */}
        <span className="flex items-center justify-end gap-2 text-neutral-border-50">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saveDraftDisabled}
          >
            Save Draft
          </button>
          <span>|</span>
          <button type="button" onClick={handleClickReloadDrafts}>
            00
          </button>
        </span>
        {isReloadModalOpen && (
          <ReloadModal
            onClose={() => setIsReloadModalOpen(false)}
            handleReload={handleClickSavedDrafts}
          />
        )}
      </div>
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <WriteTitle
          title={title}
          setTitle={setTitle}
          placeholder="Please add a title."
          maxLength={50}
        />
        {boardName &&
          (boardName === 'Question' || boardName === 'Information') && (
            <SelectCategory
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        <WriteContent
          content={content}
          setContent={setContent}
          placeholder="Add a content."
          maxLength={1000}
        />
        <UploadPics onChange={setUploadedFiles} />
        <div className="flex gap-2">
          <MainWhiteButton onClick={handleUpload} disabled={disabled}>
            Upload
          </MainWhiteButton>
          <MainButton onClick={handleTranslateAndUpload} disabled={disabled}>
            Upload in English
          </MainButton>
        </div>
      </div>
      {isPopup &&
        createPortal(
          <TranslatePopup
            title={translatedTitle}
            text={translatedContent}
            onClickLeft={() => handleCancelTranslatePopup()}
            onClickRight={() => handleUpload()}
            isLoading={translatePending}
          />,
          document.getElementById('modal-root'),
        )}
    </div>
  );
};
