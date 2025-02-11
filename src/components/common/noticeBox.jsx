import { useNavigate } from 'react-router-dom';

export const NoticeBox = () => {
  const navigate = useNavigate();
  return (
    <div
      className="text-neutral-[#6A6A6A] mb-[1.25rem] flex h-[4.375rem] w-full cursor-pointer items-center justify-center rounded-[.625rem] bg-neutral-bg-10 text-subTitle"
      onClick={() => navigate(`/my/service`, { state: { id: 2 } })}
    >
      Notice
    </div>
  );
};
