import { getNoticeDetail } from '@/apis/mypage/getNoticeDetail.api';
import { Loading } from '@/components/common/Loading';
import { TitleHeader } from '@/components/common/titleHeader';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const NoticeDetail = () => {
  const { noticeId } = useParams();

  const { data: noticeData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE, noticeId],
    queryFn: () => getNoticeDetail({ noticeId: noticeId }),
    enabled: !!noticeId,
  });

  return (
    <div className="flex flex-col w-full h-full">
      <TitleHeader text="Notice" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center w-full gap-5 px-4 pt-10 pb-7">
          <div className="flex w-full flex-col justify-start gap-[.625rem] border-b border-primary-20 pb-5">
            <span className="text-subTitle text-neutral-title">
              {noticeData && noticeData.title}
            </span>
            <span className="inline-block text-small text-neutral-border-50">
              {noticeData && noticeData.createdTime}
            </span>
          </div>
          <div className="flex justify-start w-full text-neutral-base">
            {noticeData && noticeData.content}
          </div>
        </div>
      )}
    </div>
  );
};
