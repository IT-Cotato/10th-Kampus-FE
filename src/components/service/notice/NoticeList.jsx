import { useNavigate } from 'react-router-dom';

export const NoticeList = ({ noticeId, title, date }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full flex-row items-center justify-between border-b border-primary-20 py-5"
      onClick={() => navigate(`./${noticeId}`)}
    >
      <div className="flex w-full flex-col truncate">
        <span className="truncate text-subTitle text-neutral-title">
          {title}
        </span>
        <span className="inline-block text-small text-neutral-border-50">
          {date}
        </span>
      </div>
    </div>
  );
};
