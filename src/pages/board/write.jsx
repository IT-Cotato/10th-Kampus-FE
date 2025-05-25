import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { TranslatePopup } from '@/components/board/write/TranslatePopup';
import { createPortal } from 'react-dom';
import { postWritePost } from '@/apis/board/postWritePost.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { writePostTranslate } from '@/apis/translate/writePostTranslate.api';
import { getBoardCategories } from '@/apis/board/getBoardCategories.api';
export const Write = () => {
  const queryClient = useQueryClient();
  const { boardId } = useParams();
  const [categoryList, setCategoryList] = useState([]);

  // 게시판에 적용되는 카테고리 조회
  const { data: boardCategories, isSuccess: isBoardCategoriesSuccess } =
    useQuery({
      queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
      queryFn: () => getBoardCategories({ boardId: boardId }),
      enabled: !!boardId,
    });

  useEffect(() => {
    if (isBoardCategoriesSuccess) {
      boardCategories.categories.map((item) => {
        setCategoryList((prev) => [...prev, item.categoryName]);
      });
    }
  }, [isBoardCategoriesSuccess]);

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
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const disabled = !title || !content;

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
        <button type="button">
          <X
            className="h-6 w-6 p-1 text-neutral-title"
            onClick={() => navigate(-1)}
          />
        </button>
        <span className="flex justify-center text-pageTitle text-neutral-title">
          Write
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
        <UploadPics onChange={setUploadedFiles} />
      </div>

      {/* 업로드 버튼 */}
      <div className="fixed bottom-0 flex w-full max-w-[512px] gap-2 bg-white px-4 py-4 text-title-bold-16 text-neutral-80 shadow-base">
        <MainButton color="white" onClick={handleUploadWithoutTranslation}>
          Upload
        </MainButton>
        <MainButton onClick={handleTranslateAndUpload}>
          Upload in English
        </MainButton>
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
