import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';
import { TranslatePopup } from '@/components/board/write/TranslatePopup';
import { createPortal } from 'react-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { writePostTranslate } from '@/apis/translate/writePostTranslate.api';
import { WritePrice } from '@/components/market/WritePrice';
export const MarketWrite = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [content, setContent] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(null);
  const [price, setPrice] = useState();
  const [translatedContent, setTranslatedContent] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const disabled =
    !title || !content || !price || selectedCategory.length === 0;

  useEffect(() => {
    setCategoryList([
      'Book',
      'Electronic',
      'Fashion',
      'Furniture',
      'Living&Kitchen',
    ]);
  }, []);

  // 중고거래 게시판에 적용되는 카테고리 조회
  // const { data: boardCategories, isSuccess: isBoardCategoriesSuccess } =
  //   useQuery({
  //     queryKey: [QUERY_KEYS.GET_BOARD_CATEGORIES, boardId],
  //     queryFn: () => getBoardCategories({ boardId: boardId }),
  //     enabled: !!boardId,
  //   });

  // useEffect(() => {
  //   if (isBoardCategoriesSuccess) {
  //     setCategoryList([...boardCategories?.categories]);
  //   }
  // }, [isBoardCategoriesSuccess]);

  // const {
  //   mutate: addPost,
  //   isPending: postPending,
  //   isError: postError,
  // } = useMutation({
  //   mutationFn: (newPost) => postWritePost({ data: newPost }),
  //   onSuccess: (response) => {
  //     const createdPostId = response.postId;
  //     queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] });
  //     navigate(`${path.board.base}/${boardId}/${createdPostId}`, {
  //       replace: true,
  //     });
  //   },
  // });

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

  const handleUpload = async () => {
    const formData = new FormData();

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
        <span className="flex items-center justify-end gap-2 text-neutral-border-50">
          <button type="button">Save Draft</button>
          <span>|</span>
          <button type="button">00</button>
        </span>
      </div>
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <UploadPics onChange={setUploadedFiles} />
        <WriteTitle
          title={title}
          setTitle={setTitle}
          placeholder="Add a title."
          maxLength={50}
        />
        <WritePrice
          price={price}
          setPrice={setPrice}
          placeholder="Write the price."
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
          maxLength={1000}
        />
      </div>

      {/* 업로드 버튼 */}
      <div className="fixed bottom-0 flex w-full max-w-[512px] gap-2 bg-white px-4 py-4 text-title-bold-16 text-neutral-80 shadow-base">
        <MainWhiteButton onClick={handleUpload} disabled={disabled}>
          Upload
        </MainWhiteButton>
        <MainButton onClick={handleTranslateAndUpload} disabled={disabled}>
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
