import { useNavigate } from 'react-router-dom';
import NoticeIcon from '@/assets/imgs/notice.svg?react';

export const NoticeList = ({ key, title, date }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center justify-between w-full py-5 border-b border-primary-20"
      onClick={() => navigate(`./${key}`)}
    >
      <div className="flex flex-col w-full truncate">
        <span className="flex gap-[.625rem] items-center">
          {/* Icon 조건 수정해야함 */}
          <NoticeIcon className="w-[1.625rem] h-[1.375rem] text-[#FEE99E]" />
          <span className="truncate text-subTitle text-neutral-title">
            {title}
          </span>
        </span>
        <span className="inline-block text-neutral-base">{date}</span>
      </div>
    </div>
  );
};
