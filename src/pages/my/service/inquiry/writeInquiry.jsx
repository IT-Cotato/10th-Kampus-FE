import { UploadPics } from '@/components/board/write/UploadPics';
import { WriteContent } from '@/components/board/write/WriteContent';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { ButtonRound } from '@/components/common/ButtonRound';
import { MainButton } from '@/components/common/MainButton';
import { TitleHeader } from '@/components/common/titleHeader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WriteInquiry = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const disabled = !title || !content;

  const handleSubmit = () => {
    // 백 연동
    console.log(title);
    console.log(content);
    if (uploadedFiles) {
      console.log(uploadedFiles);
    }
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="1:1 Inquiry" />
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <WriteTitle
          title={title}
          setTitle={setTitle}
          placeholder="Write a inquiry title."
        />
        <div className='flex flex-col gap-4'>
        <WriteContent
          content={content}
          setContent={setContent}
          placeholder="Please write the content in English or Korean."
        />
        <UploadPics onChange={setUploadedFiles} />
        <div className="flex justify-center w-full">
          <ButtonRound
            text="Submit"
            onClick={handleSubmit}
            disabled={disabled}
          />
        </div>
        </div>
      </div>
    </div>
  );
};
