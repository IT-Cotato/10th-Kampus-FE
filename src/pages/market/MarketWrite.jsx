import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { TranslatePopup } from '@/components/board/write/TranslatePopup';
import { createPortal } from 'react-dom';
import { useMutation } from '@tanstack/react-query';
import { writePostTranslate } from '@/apis/translate/writePostTranslate.api';
import { WritePrice } from '@/components/market/WritePrice';
import { useGetMarketCategory } from '@/state/query/market/useGetMarketCategory';
import { usePostMarketProduct } from '@/state/mutation/market/usePostMarketProduct';
export const MarketWrite = () => {
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

  // 빈칸으로 업로드 버튼 클릭 시 focus를 위한 위한 ref
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const contentRef = useRef(null);

  const [isImageInvalid, setIsImageInvalid] = useState(false);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isPriceInvalid, setIsPriceInvalid] = useState(false);
  const [isContentInvalid, setIsContentInvalid] = useState(false);
  const [isCategoryInvalid, setIsCategoryInvalid] = useState(false);

  const { data: categoryData } = useGetMarketCategory();

  useEffect(() => {
    setCategoryList(categoryData);
  }, [categoryData]);

  const { mutate: addPost } = usePostMarketProduct();

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

  const handleFocus = (ref) => {
    ref.current?.focus();
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // 업로드 버튼 클릭 시 유효성 검증
  const validateBeforeUpload = () => {
    setIsImageInvalid(uploadedFiles.length === 0);
    setIsTitleInvalid(!title);
    setIsPriceInvalid(!price);
    setIsCategoryInvalid(selectedCategory.length === 0);
    setIsContentInvalid(!content);

    if (uploadedFiles.length === 0) {
      handleFocus(imageRef);
      return false;
    } else if (!title) {
      handleFocus(titleRef);
      return false;
    } else if (!price) {
      handleFocus(priceRef);
      return false;
    } else if (selectedCategory.length === 0) {
      handleFocus(categoryRef);
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

    formData.append('title', translatedTitle ?? title);
    formData.append('description', translatedContent ?? content);
    formData.append('price', price);

    if (selectedCategory.length !== 0) {
      selectedCategory.forEach((category) =>
        formData.append('categoryNames', category),
      );
    }

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append('images', file); // 각 파일을 개별적으로 추가
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
    if (validateBeforeUpload()) {
      setIsPopup(true);
      setTranslate({
        data: {
          title: title,
          description: content,
          targetLanguageCode: 'EN-US',
        },
      });
    }
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
      </div>
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <UploadPics
          onChange={setUploadedFiles}
          imageRef={imageRef}
          invalid={isImageInvalid}
          setInvalid={setIsImageInvalid}
        />
        <WriteTitle
          title={title}
          setTitle={setTitle}
          placeholder="Add a title."
          maxLength={50}
          titleRef={titleRef}
          invalid={isTitleInvalid}
          setInvalid={setIsTitleInvalid}
        />
        <WritePrice
          price={price}
          setPrice={setPrice}
          placeholder="Write the price."
          priceRef={priceRef}
          invalid={isPriceInvalid}
          setInvalid={setIsPriceInvalid}
        />
        {categoryList?.length !== 0 && (
          <SelectCategory
            categories={categoryList}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoryRef={categoryRef}
            invalid={isCategoryInvalid}
            setInvalid={setIsCategoryInvalid}
            max={3}
          />
        )}
        <WriteContent
          content={content}
          setContent={setContent}
          placeholder="Add a content."
          contentRef={contentRef}
          invalid={isContentInvalid}
          setInvalid={setIsContentInvalid}
          maxLength={700}
        />
      </div>

      {/* 업로드 버튼 */}
      <div className="fixed bottom-0 flex w-full max-w-[512px] gap-2 bg-white px-4 py-4 shadow-base">
        <MainButton onClick={handleUploadWithoutTranslation} color="white">
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
