import { useNavigate } from 'react-router-dom';

export const NoticeBox = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full rounded-[.625rem] bg-neutral-bg-10 h-[4.375rem] flex items-center justify-center text-subTitle text-neutral-[#6A6A6A] cursor-pointer mb-[1.25rem]"
      onClick={() => navigate(`/my/service`, { state: { id: 2 } })}
    >
      Notice
    </div>
  );
};
