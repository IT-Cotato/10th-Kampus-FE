import X from '@/assets/imgs/icon/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { TranslateModal } from '@/components/common/TranslateModal';
import { WritePrice } from '@/components/market/WritePrice';
import { useGetMarketCategory } from '@/state/query/market/useGetMarketCategory';
import { usePostMarketProduct } from '@/state/mutation/market/usePostMarketProduct';
import { useGetMarketProduct } from '@/state/query/market/useGetMarketProduct';
import { Modal, MODAL_TYPES } from '@/components/common/Modal';
import { urlToFile } from '@/utils/urlToFile';
import { usePutMarketProduct } from '@/state/mutation/market/usePutMarketProduct';
import { usePostWriteTranslate } from '@/state/mutation/common/usePostWriteTranslate';

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
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const { productId } = useParams(); // productId 있으면 수정 페이지

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
  const { data: prevPost } = useGetMarketProduct();
  useEffect(() => {
    if (prevPost) {
      setTitle(prevPost.title);
      setPrice(prevPost.price);
      setContent(prevPost.description);
      setSelectedCategory(prevPost.categories);
      loadPrevPhotos();
    }
  }, [prevPost]);
  const { mutate: putPost } = usePutMarketProduct();

  const [prevPhotoLoadErrorMessage, setPrevPhotoLoadErrorMessage] =
    useState('');
  const loadPrevPhotos = async () => {
    try {
      const filePromises = prevPost.photos.map((photo) =>
        urlToFile(photo.photoUrl, photo.order),
      );
      const files = await Promise.all(filePromises);
      setUploadedFiles(files);
    } catch (error) {
      alert(error);
    }
  };

  const { mutate: handleTranslate, isPending: translatePending } =
    usePostWriteTranslate(setTranslatedTitle, setTranslatedContent);

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

    if (productId) {
      putPost({ productId, data: formData });
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
          {productId ? 'Edit' : 'Write'}
        </span>
      </div>
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <UploadPics
          onChange={setUploadedFiles}
          prev={uploadedFiles}
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
        {productId ? (
          <MainButton onClick={handleUploadWithoutTranslation}>Edit</MainButton>
        ) : (
          <>
            <MainButton
              onClick={handleUploadWithoutTranslation}
              variant="white"
            >
              Upload
            </MainButton>
            <MainButton onClick={handleTranslateAndUpload}>
              Upload in English
            </MainButton>
          </>
        )}
      </div>

      {isTranslateModalOpen && (
        <TranslateModal
          title={translatedTitle}
          text={translatedContent}
          onClickLeft={() => handleCancelTranslatePopup()}
          onClickRight={() => handleUpload()}
          isLoading={translatePending}
          price={price}
          categories={selectedCategory}
        />
      )}

      {prevPhotoLoadErrorMessage && (
        <Modal
          type={MODAL_TYPES.CONFIRM}
          title={prevPhotoLoadErrorMessage}
          onClickRight={() => setPrevPhotoLoadErrorMessage('')}
          onClose={() => setPrevPhotoLoadErrorMessage('')}
        ></Modal>
      )}
    </div>
  );
};
