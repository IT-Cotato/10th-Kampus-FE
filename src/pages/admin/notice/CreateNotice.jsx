import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { ShortInput } from '@/components/admin/ShortInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';
import { postCreateNotice } from '@/apis/admin/postCreateNotice.api';
import { getNoticeDetail } from '@/apis/mypage/getNoticeDetail.api';
import { patchAdminNotice } from '@/apis/admin/patchAdminNotice.api';
import { toast } from 'react-toastify';
import { Toast } from '@/components/common/toast';

export const CreateNotice = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: noticeData } = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTICE, noticeId],
    queryFn: () => getNoticeDetail({ noticeId: noticeId }),
    enabled: !!noticeId,
  });

  useEffect(() => {
    if (noticeData) {
      console.log(noticeData);
      setIsEditMode(true);
      // 백 연동
      setTitle(noticeData.title);
      setContent(noticeData.content);
    }
  }, [noticeData, noticeId]);

  const { mutate: createBoard } = useMutation({
    mutationFn: postCreateNotice,
  });

  const handleCreateNotice = () => {
    const data = {
      title: title,
      content: content,
    };

    createBoard(
      { data: data },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: () => {
          toast.error('공지사항을 작성하지 못했습니다.');
        },
      },
    );
  };

  const { mutate: editBoard } = useMutation({
    mutationFn: ({ noticeId, noticeData }) =>
      patchAdminNotice({ noticeId, data: noticeData }),
  });

  const handleEditNotice = (noticeId) => {
    const data = {
      title: title,
      content: content,
    };

    editBoard(
      { noticeId: noticeId, noticeData: data },
      {
        onSuccess: () => {
          navigate(-1);
        },
        onError: () => {
          toast.error('공지사항을 수정하지 못했습니다.');
        },
      },
    );
  };

  const disabled = !title || !content;

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-8">
        <div className="flex h-10 gap-5">
          <div className="flex items-center gap-2 text-subTitle"></div>
        </div>

        <div className="flex max-w-[31.25rem] flex-col gap-5">
          <ShortInput
            value={title}
            onChange={setTitle}
            placeholder="공지사항 제목을 적어주세요."
          />
          <textarea
            cols={3}
            rows={10}
            value={content}
            className="resize-none rounded-lg border border-neutral-border-40 p-2"
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지사항 본문을 적어주세요."
          />
          <MainButton
            disabled={disabled}
            onClick={
              isEditMode ? () => handleEditNotice(noticeId) : handleCreateNotice
            }
          >
            {isEditMode ? '공지 수정' : '공지 작성'}
          </MainButton>
        </div>
      </div>
      <Toast />
    </div>
  );
};
