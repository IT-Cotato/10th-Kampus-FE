import { getNoticeDetail } from '@/apis/mypage/getNoticeDetail.api';
import { Loading } from '@/components/common/Loading';
import { TitleHeader } from '@/components/common/titleHeader';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const NoticeDetail = () => {
  const { noticeId } = useParams();

  const { data: noticeData, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE, noticeId],
    queryFn: () => getNoticeDetail({ noticeId: noticeId }),
    enabled: !!noticeId,
  });

  return (
    <div className="flex h-full w-full flex-col">
      <TitleHeader text="Notice" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex w-full flex-col items-center gap-5 px-4 pb-7 pt-10">
          <div className="flex w-full flex-col justify-start gap-[.625rem] border-b border-primary-20 pb-5">
            <span className="text-subTitle text-neutral-title">
              {noticeData && noticeData.title}
            </span>
            <span className="inline-block text-small text-neutral-border-50">
              {noticeData && noticeData.createdTime}
            </span>
          </div>
          <div className="flex w-full justify-start text-neutral-base">
            {noticeData && noticeData.content}
          </div>
        </div>
      )}
    </div>
  );
};
