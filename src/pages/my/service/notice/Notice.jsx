import Logo from '@/assets/imgs/icon/kampus-logo.svg?react';
import { getNoticeList } from '@/apis/mypage/getNoticeList.api';
import { Loading } from '@/components/common/Loading';
import { NoticeList } from '@/components/service/notice/NoticeList';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const Notice = () => {
  const { data: noticeList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE],
    queryFn: () => getNoticeList(),
  });

  return (
    <div className="flex w-full flex-1 flex-col">
      {isLoading && <Loading />}
      {!isLoading && noticeList.notices.length > 0 ? (
        noticeList.notices.map((notice) => (
          <NoticeList
            key={notice.id}
            noticeId={notice.id}
            title={notice.title}
            date={notice.createdTime}
          />
        ))
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-10">
          <Logo className="w-32 text-neutral-disabled" />
          <span className="text-center text-neutral-border-40">
            There is no notices yet!
          </span>
        </div>
      )}
    </div>
  );
};
