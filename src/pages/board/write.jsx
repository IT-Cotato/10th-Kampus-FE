import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { TranslateModal } from '@/components/common/TranslateModal';
import { postWritePost } from '@/apis/board/postWritePost.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { getBoardCategories } from '@/apis/board/getBoardCategories.api';
import { useGetBoardPost } from '@/state/query/board/useGetBoardPost';
import { urlToFile } from '@/utils/urlToFile';
import { usePutBoardPost } from '@/state/mutation/board/usePutBoardPost';
import { usePostWriteTranslate } from '@/state/mutation/common/usePostWriteTranslate';

export const Write = () => {
  const queryClient = useQueryClient();
  const { boardId, postId } = useParams();
  const [categoryList, setCategoryList] = useState([]);

  // 게시판에 적용되는 카테고리 조회
  const { data: boardCategories } = useQuery({
    queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
    queryFn: () => getBoardCategories({ boardId: boardId }),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!boardId,
  });

  useEffect(() => {
    if (boardCategories && categoryList.length === 0) {
      boardCategories.categories.map((item) => {
        setCategoryList((prev) => [...prev, item.categoryName]);
      });
    }
  }, []);

  const {
    mutate: addPost,
    isPending: postPending,
    isError: postError,
  } = useMutation({
    mutationFn: (newPost) => postWritePost({ data: newPost }),
    onSuccess: (response) => {
      const createdPostId = response.postId;
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] });
      navigate(`../${createdPostId}`, {
        replace: true,
      });
    },
  });

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);

  const {
    mutate: handleTranslate,
    isPending: translatePending,
    isError: translateError,
  } = usePostWriteTranslate(setTranslatedTitle, setTranslatedContent);

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
  const { mutate: putPost } = usePutBoardPost();

  const [prevPhotoLoadErrorMessage, setPrevPhotoLoadErrorMessage] =
    useState('');
  const loadPrevPhotos = async () => {
    try {
      const filePromises = prevPost.postPhotos.map((photo) =>
        urlToFile(photo.photoUrl, photo.order),
      );
      const files = await Promise.all(filePromises);
      setUploadedFiles(files);
    } catch (error) {
      alert(error);
    }
  };

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

    if (postId) {
      putPost({ postId, data: formData });
    } else {
      addPost(formData);
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

  useEffect(() => {
    if (!boardId) {
      // 보드에서 Write 버튼 누르지 않고 다른 경로로 들어올 시 이전 기록으로 navigate
      navigate(-1);
    }
  }, [boardId, navigate]);

  if (!boardId) return null;

  return (
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
        {/* 임시저장 추후 구현 */}
        {/* <span className="flex items-center justify-end gap-2 text-neutral-border-50">
          <button type="button">Save Draft</button>
          <span>|</span>
          <button type="button">00</button>
        </span> */}
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
        {categoryList.length !== 0 && (
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
          <MainButton onClick={handleUploadWithoutTranslation}>Edit</MainButton>
        ) : (
          <>
            <MainButton color="white" onClick={handleUploadWithoutTranslation}>
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
  );
};
