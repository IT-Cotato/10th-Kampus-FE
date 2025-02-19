import { useEffect, useState } from 'react';
import XIcon from '@/assets/imgs/x.svg?react';
import { SearchDropdown } from '@/components/join/searchDropdown';
import University from '@/constants/university';
import { useNavigate, useParams } from 'react-router-dom';
import { MainButton } from '@/components/common/MainButton';
import { ShortInput } from '@/components/admin/ShortInput';

export const CreateNotice = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const data = {
    type: 'schoolboard',
    title: 'Free Talk',
    description:
      'Chat about anything and everything! Share your experiences, thoughts, and daily life with the community.',
    categories: ['Question', 'Information'],
  };

  useEffect(() => {
    if (noticeId) {
      setIsEditMode(true);
      // 백 연동
      setTitle(data.title);
      setContent(data.description);
    }
  }, [noticeId]);

  const handleCreateNotice = () => {
    // 백 연동
    console.log(title);
    console.log(content);

    navigate(-1);
  };

  const handleEditNotice = () => {
    // 백 연동
    console.log(noticeId);
    console.log(title);
    console.log(content);

    navigate(-1);
  };

  const disabled = !title || !content;

  return (
    <div className="flex flex-col flex-1 gap-5 px-5">
      <div className="flex flex-col h-full gap-5 p-8 bg-white rounded-2xl">
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
            className="p-2 border rounded-lg resize-none border-neutral-border-40"
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지사항 본문을 적어주세요."
          />
          <MainButton
            disabled={disabled}
            onClick={isEditMode ? handleEditNotice : handleCreateNotice}
          >
            {isEditMode ? '공지 수정' : '공지 작성'}
          </MainButton>
        </div>
      </div>
    </div>
  );
};
