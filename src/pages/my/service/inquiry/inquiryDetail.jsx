import { TitleHeader } from '@/components/common/titleHeader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // 백 연동
    setTitle('문의사항 제목입니다');
    setContent('본문입니다.'); // 줄바꿈 이슈?
    setAnswer('답변입니다');
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="1:1 Inquriy" />
      <div className="flex flex-col w-full h-full px-4 py-[1.25rem] gap-[2.5rem]">
        {/* Title */}
        <div className="flex flex-col gap-3">
          <div className="text-subTitle">Title</div>
          <div className="box-border flex flex-row w-full px-[.875rem] py-[1.125rem] border border-neutral-border-30 rounded-lg gap-[.625rem]">
            <div className="w-full leading-none placeholder-neutral-border-50">
              {title}
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-3">
          <div className="text-subTitle">Content</div>
          <div className="box-border flex flex-row w-full px-[.875rem] py-[1.125rem] border border-neutral-border-30 rounded-lg gap-[.625rem]">
            <div className="w-full leading-none placeholder-neutral-border-50 h-[12.5rem]">
              {content}
            </div>
          </div>
        </div>
        {/* <UploadPics onChange={setUploadedFiles} /> */}
        {/* Answer */}
        {answer && (
          <div className="flex flex-col gap-3">
            <div className="w-fit border border-primary-20 px-3 py-1 rounded-[1.25rem] text-base text-neutral-base bg-primary-10">
              Answered
            </div>
            <div className="box-border flex flex-row w-full px-[.875rem] py-[1.125rem] border border-primary-20 bg-primary-5 rounded-lg gap-[.625rem]">
              <div className="w-full leading-none placeholder-neutral-border-50 h-[12.5rem]">
                {answer}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
