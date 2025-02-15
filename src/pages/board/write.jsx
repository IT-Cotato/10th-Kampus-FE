import X from '@/assets/imgs/x.svg?react';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { WriteContent } from '@/components/board/write/WriteContent';
import { UploadPics } from '@/components/board/write/UploadPics';
import { MainButton } from '@/components/common/MainButton';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectCategory } from '@/components/board/write/SelectCategory';
import { MainWhiteButton } from '@/components/common/MainWhiteButton';

export const Write = () => {
  const { boardTitle } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const disabled = !title || !content;

  const handleUpload = () => {
    // 백 연동
    console.log(title);
    if (selectedCategory) {
      console.log(selectedCategory);
    }
    console.log(content);
    if (uploadedFiles) {
      console.log(uploadedFiles);
    }
    navigate(-1);
  };

  const handleTranslateAndUpload = () => {
    // 번역 관련 팝업
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid items-center w-full grid-cols-3 px-4 pt-4 pb-3">
        <button type="button">
          <X
            className="w-6 h-6 p-1 text-neutral-title"
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
        />
        {(boardTitle === 'question' || boardTitle === 'information') && (
          <SelectCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <WriteContent
          content={content}
          setContent={setContent}
          placeholder="Add a content."
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
    </div>
  );
};
