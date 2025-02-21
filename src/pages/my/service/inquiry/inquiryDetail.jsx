import { getInquiryDetail } from '@/apis/mypage/getInquiryDetail.api';
import { Loading } from '@/components/common/Loading';
import { TitleHeader } from '@/components/common/titleHeader';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const InquiryDetail = () => {
  const { inquiryId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { data: inquiryDetails, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_INQUIRY_DETAILS, inquiryId],
    queryFn: () => getInquiryDetail({ inquiryId: inquiryId }),
    enabled: !!inquiryId,
  });

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="1:1 Inquriy" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex h-full w-full flex-col gap-[2.5rem] px-4 py-[1.25rem]">
          {/* Title */}
          <div className="flex flex-col gap-3">
            <div className="text-subTitle">Title</div>
            <div className="box-border flex w-full flex-row gap-[.625rem] rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
              <div className="w-full leading-none placeholder-neutral-border-50">
                {inquiryDetails.userInquiryDetail.title}
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-col gap-3">
            <div className="text-subTitle">Content</div>
            <div className="box-border flex w-full flex-row gap-[.625rem] rounded-lg border border-neutral-border-30 px-[.875rem] py-[1.125rem]">
              <div className="h-[12.5rem] w-full whitespace-pre leading-none placeholder-neutral-border-50">
                {inquiryDetails.userInquiryDetail.content}
              </div>
            </div>
          </div>
          {/* <UploadPics onChange={setUploadedFiles} /> */}
          {/* Answer */}
          {inquiryDetails.userInquiryDetail.status !== 'WAITING' && (
            <div className="flex flex-col gap-3">
              <div className="w-fit rounded-[1.25rem] border border-primary-20 bg-primary-10 px-3 py-1 text-base text-neutral-base">
                Answered
              </div>
              <div className="box-border flex w-full flex-row gap-[.625rem] rounded-lg border border-primary-20 bg-primary-5 px-[.875rem] py-[1.125rem]">
                <div className="h-[12.5rem] w-full leading-none placeholder-neutral-border-50">
                  {inquiryDetails.userInquiryDetail.adminReplyContent}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
