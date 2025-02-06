import { useNavigate } from 'react-router-dom';

export const NoticeList = ({ noticeId, title, date }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row items-center justify-between w-full py-5 border-b border-primary-20"
      onClick={() => navigate(`./${noticeId}`)}
    >
      <div className="flex flex-col w-full truncate">
        <span className="flex gap-[.625rem] items-center">
          <span className="truncate text-subTitle text-neutral-title">
            {title}
          </span>
        </span>
        <span className="inline-block text-neutral-base">{date}</span>
      </div>
    </div>
  );
};
