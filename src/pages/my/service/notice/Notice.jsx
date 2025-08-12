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
    <div className="flex w-full flex-col">
      {isLoading ? (
        <Loading />
      ) : (
        noticeList.notices.map((notice) => (
          <NoticeList
            key={notice.id}
            noticeId={notice.id}
            title={notice.title}
            date={notice.createdTime}
          />
        ))
      )}
    </div>
  );
};
