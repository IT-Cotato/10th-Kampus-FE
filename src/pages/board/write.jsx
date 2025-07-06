import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { TranslateModal } from '@/components/common/TranslateModal';
import { useGetBoardPost } from '@/state/query/board/useGetBoardPost';
import { urlToFile } from '@/utils/urlToFile';
import { usePutBoardPost } from '@/state/mutation/board/usePutBoardPost';
import { usePostWriteTranslate } from '@/state/mutation/common/usePostWriteTranslate';
import { ReloadModal } from '@/components/board/draft/ReloadModal';
import { path } from '@/routes/path';
import { useGetDraftCount } from '@/state/query/post/useGetDraftCount';
import { useGetDraft } from '@/state/query/post/useGetDraft';
import {
  usePatchDraft,
  usePostDraft,
} from '@/state/mutation/post/useHandleDraft';
import { useSaveDraft } from '@/state/mutation/post/useSaveDraft';
import { usePostPost } from '@/state/mutation/post/useHandlePost';
import { useGetBoardVanillaCategory } from '@/state/query/board/useGetBoardCategory';

export const Write = () => {
  const { boardId, postId } = useParams();

  // 임시저장글 선택해서 넘어온 경우
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get('draftId');
  const { data: draftData } = useGetDraft({ postDraftId: draftId });

  // 게시판에 적용되는 카테고리 조회
  const { data: boardCategories } = useGetBoardVanillaCategory();
  const categoryList =
    boardCategories?.categories.map((item) => item.categoryName) || [];

  // 글 올리기
  const { mutate: addPost } = usePostPost();

  // 임시저장글 게시
  const { mutate: postDraft } = usePostDraft({ boardId, postDraftId: draftId });

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);

  // 번역
  const {
    mutate: handleTranslate,
    isPending: translatePending,
    isError: translateError,
  } = usePostWriteTranslate(setTranslatedTitle, setTranslatedContent);

  // 글 수정하기 위해 조회
  const { data: prevPost } = useGetBoardPost();

  useEffect(() => {
    if (prevPost) {
      setTitle(prevPost.title);
      setContent(prevPost.content);
      if (prevPost?.categories) {
        setSelectedCategory(prevPost?.categories);
      }
      loadPrevPhotos();
    }
  }, [prevPost]);

  useEffect(() => {
    if (draftData) {
      setTitle(draftData.title);
      setContent(draftData.content);
      if (draftData?.categories) {
        setSelectedCategory(draftData?.categories);
      }
      loadPrevPhotos();
    }
  }, [draftData]);

  const { mutate: putPost } = usePutBoardPost();

  const [prevPhotoLoadErrorMessage, setPrevPhotoLoadErrorMessage] =
    useState('');
  const loadPrevPhotos = async () => {
    try {
      const filePromises = (prevPost ?? draftData).postPhotos.map((photo) =>
        urlToFile(photo.photoUrl, photo.order),
      );
      const files = await Promise.all(filePromises);
      setUploadedFiles(files);
    } catch (error) {
      setPrevPhotoLoadErrorMessage(
        error?.message || '이미지 업로드 중 알 수 없는 오류가 발생하였습니다.',
      );
    }
  };

  const saveDraftDisabled = !title && !content && uploadedFiles.length === 0;
  const [isReloadModalOpen, setIsReloadModalOpen] = useState(false);

  // 빈칸으로 업로드 버튼 클릭 시 focus를 위한 위한 ref
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isContentInvalid, setIsContentInvalid] = useState(false);

  const handleFocus = (ref) => {
    ref.current?.focus();
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // 업로드 버튼 클릭 시 유효성 검증
  const validateBeforeUpload = () => {
    setIsTitleInvalid(!title);
    setIsContentInvalid(!content);

    if (!title) {
      handleFocus(titleRef);
      return false;
    } else if (!content) {
      handleFocus(contentRef);
      return false;
    }
    return true;
  };

  const handleUploadWithoutTranslation = () => {
    if (validateBeforeUpload()) {
      handleUpload();
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append('boardId', boardId);
    formData.append('title', translatedTitle ?? title);
    formData.append('content', translatedContent ?? content);

    if (selectedCategory.length !== 0) {
      selectedCategory.forEach((category) =>
        formData.append('categories', category),
      );
    }

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append(`images`, file); // 각 파일을 개별적으로 추가
      });
    }

    if (draftId !== undefined || draftId !== null) {
      postDraft(formData);
    } else {
      if (postId !== undefined || postId !== null) {
        addPost(formData);
      } else {
        putPost({ postId, data: formData });
      }
    }
  };

  const handleCancelTranslatePopup = () => {
    setIsTranslateModalOpen(false);
    setTranslatedTitle(null);
    setTranslatedContent(null);
  };

  const handleTranslateAndUpload = () => {
    if (validateBeforeUpload()) {
      setIsTranslateModalOpen(true);
      handleTranslate({
        title: title,
        content: content,
        targetLanguageCode: 'EN-US',
      });
    }
  };

  const { mutate: saveDraft } = useSaveDraft();

  const { data: draftCount } = useGetDraftCount();

  const { mutate: patchDraft } = usePatchDraft({ draftId });

  // 임시저장 버튼 클릭 시
  const handleSaveDraft = async () => {
    const formData = new FormData();

    formData.append('boardId', boardId);
    formData.append('title', title);
    formData.append('content', content);

    if (selectedCategory.length !== 0) {
      formData.append('categories', selectedCategory);
    }

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append(`images`, file); // 각 파일을 개별적으로 추가
      });
    }

    if (!draftId) {
      // 임시저장
      saveDraft(formData);
    } else {
      // 임시저장 덮어쓰기
      patchDraft(formData);
    }
  };

  const handleClickReloadDrafts = () => {
    if (title !== '' || content !== '' || uploadedFiles.length !== 0) {
      setIsReloadModalOpen((prev) => !prev);
    } else {
      handleClickSavedDrafts();
    }
  };

  // 임시저장 목록 페이지로 이동
  const handleClickSavedDrafts = () => {
    if (boardId !== undefined) {
      navigate(`../../${path.board.specific.draft}`);
    } else {
      navigate(`../../../../${path.board.specific.draft}`);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex h-full w-full flex-col pb-[5.6875rem]">
        <div className="grid w-full grid-cols-3 items-center px-4 pb-3 pt-4">
          <X
            aria-label="Close Button"
            className="h-6 w-6 cursor-pointer p-1 text-neutral-title"
            onClick={() => navigate(-1)}
          />
          <span className="flex justify-center text-pageTitle text-neutral-title">
            {postId ? 'Edit' : 'Write'}
          </span>
          {/* 임시저장 */}
          <span className="flex items-center justify-end gap-2 text-neutral-border-50">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saveDraftDisabled}
              className="cursor-pointer"
            >
              Save Draft
            </button>
            <span>|</span>
            <button
              type="button"
              onClick={handleClickReloadDrafts}
              className="cursor-pointer"
            >
              {draftCount || '00'}
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
            titleRef={titleRef}
            invalid={isTitleInvalid}
            setInvalid={setIsTitleInvalid}
          />
          {categoryList?.length !== 0 && (
            <SelectCategory
              categories={categoryList}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          <WriteContent
            content={content}
            setContent={setContent}
            placeholder="Add a content."
            maxLength={700}
            contentRef={contentRef}
            invalid={isContentInvalid}
            setInvalid={setIsContentInvalid}
          />
          <UploadPics onChange={setUploadedFiles} prev={uploadedFiles} />
        </div>

        {/* 업로드 버튼 */}
        <div className="fixed bottom-0 flex w-full max-w-[512px] gap-2 bg-white px-4 py-4 text-title-bold-16 text-neutral-80 shadow-base">
          {postId ? (
            <MainButton onClick={handleUploadWithoutTranslation}>
              Edit
            </MainButton>
          ) : (
            <>
              <MainButton
                color="white"
                onClick={handleUploadWithoutTranslation}
              >
                Upload
              </MainButton>
              <MainButton onClick={handleTranslateAndUpload}>
                Upload in English
              </MainButton>
            </>
          )}
        </div>
        {prevPhotoLoadErrorMessage && (
          <Modal
            type={MODAL_TYPES.CONFIRM}
            title={prevPhotoLoadErrorMessage}
            onClickRight={() => setPrevPhotoLoadErrorMessage('')}
            onClose={() => setPrevPhotoLoadErrorMessage('')}
          ></Modal>
        )}

        {isTranslateModalOpen && (
          <TranslateModal
            title={translatedTitle}
            text={translatedContent}
            onClickLeft={() => handleCancelTranslatePopup()}
            onClickRight={() => handleUpload()}
            isLoading={translatePending}
            categories={selectedCategory}
          />
        )}
      </div>
    </div>
  );
};
