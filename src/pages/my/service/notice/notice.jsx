import { getNoticeList } from '@/apis/mypage/getNoticeList.api';
import { NoticeList } from '@/components/service/notice/NoticeList';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const Notice = () => {
  const { data: noticeList } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE],
    queryFn: () => getNoticeList(),
  });

  return (
    <div className="flex flex-col w-full">
      {noticeList && noticeList.notices.map((notice) => (
        <NoticeList
          key={notice.id}
          noticeId={notice.id}
          title={notice.title}
          date={notice.date}
        />
      ))}
    </div>
  );
};
