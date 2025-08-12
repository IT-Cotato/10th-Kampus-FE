import { postWriteInquiry } from '@/apis/mypage/postWriteInquiry.api';
import { UploadPics } from '@/components/board/write/UploadPics';
import { WriteContent } from '@/components/board/write/WriteContent';
import { WriteTitle } from '@/components/board/write/WriteTitle';
import { ButtonRound } from '@/components/common/ButtonRound';
import { TitleHeader } from '@/components/common/TitleHeader';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WriteInquiry = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { mutate: addInquiry } = useMutation({
    mutationFn: (inquiry) => postWriteInquiry({ data: inquiry }),
    onSuccess: () => {
      navigate(-1);
    },
  });

  const disabled = !title || !content;

  const handleSubmit = () => {
    // 백 연동
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        formData.append('images', file); // 각 파일을 개별적으로 추가
      });
    }
    addInquiry(formData);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="1:1 Inquiry" />
      <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
        <WriteTitle
          title={title}
          setTitle={setTitle}
          placeholder="Write a inquiry title."
        />
        <div className="flex flex-col gap-4">
          <WriteContent
            content={content}
            setContent={setContent}
            placeholder="Please write the content in English or Korean."
          />
          <UploadPics onChange={setUploadedFiles} />
          <div className="flex w-full justify-center">
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
