import { deleteAdminNotice } from '@/apis/admin/deleteAdminNotice.api';
import { getNoticeList } from '@/apis/mypage/getNoticeList.api';
import { ButtonRound } from '@/components/common/ButtonRound';
import { QUERY_KEYS } from '@/constants/api';
import { path } from '@/routes/path';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const NoticeManagement = () => {
  const navigate = useNavigate();

  const { data: noticeList } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE],
    queryFn: () => getNoticeList(),
  });

  const queryClient = useQueryClient();

  const { mutate: deleteNotice } = useMutation({
    mutationFn: (noticeId) => deleteAdminNotice({ noticeId: noticeId }),
    onSuccess: () => {
      alert('공지사항이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_NOTICE] }); // 삭제 후 리스트 다시 불러오기
    },
    onError: (error) => {
      alert('공지사항을 삭제하지 못했습니다.');
    },
  });

  const handleDeleteNotice = (id) => {
    deleteNotice(id);
  };

  return (
    <div className="flex flex-col flex-1 gap-5">
      <div className="flex flex-col w-full gap-5 p-8 bg-white h-fit rounded-2xl">
        <h1 className="text-pageTitle">공지사항 작성</h1>
        <ButtonRound
          text="공지사항 작성하러 가기"
          onClick={() => navigate(path.admin.notice.create)}
        />
      </div>
      <div className="relative flex flex-col w-full h-full gap-5 p-8 text-base bg-white rounded-2xl text-neutral-title">
        <h1 className="text-subTitle">공지사항 리스트</h1>
        <table className="divide-y divide-primary-20">
          <thead>
            <tr className="h-8 text-primary-base">
              <th scope="col" className="text-start">
                공지 등록일
              </th>
              <th scope="col" className="text-start">
                공지 제목
              </th>
              <th scope="col" className="text-start">
                수정
              </th>
              <th scope="col" className="text-start">
                삭제
              </th>
            </tr>
          </thead>
          {noticeList &&
            noticeList.notices.map((notice, index) => (
              <tbody key={index}>
                <tr className="h-12">
                  <td>{notice.createdTime}</td>
                  <td>{notice.title}</td>
                  <td>
                    <ButtonRound
                      text="수정하기"
                      size="short"
                      onClick={() =>
                        navigate(`./${notice.id}/${path.admin.notice.edit}`)
                      }
                    />
                  </td>
                  <td>
                    <ButtonRound
                      text="삭제하기"
                      theme="border"
                      size="short"
                      onClick={() => handleDeleteNotice(notice.id)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};
