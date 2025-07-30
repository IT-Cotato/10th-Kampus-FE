import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import postCardIcon from '@/assets/imgs/postCardIcon.svg';

export const BoxList = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center gap-5 whitespace-nowrap py-[.625rem]"
      onClick={() => navigate(`${path.board.base}/${text.boardId}`)}
    >
      <h1 className="text-subTitle text-neutral-title">{text?.boardName}</h1>
      <h2 className="truncate text-base text-neutral-base">
        {text?.postTitle}
      </h2>
    </div>
  );
};
export const CardPost = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex min-w-[9.5rem] flex-col gap-[.625rem] whitespace-nowrap"
      onClick={() => navigate(`${path.board.base}/5/${data.postId}`)}
    >
      <div className="relative">
        <img
          src={data?.thumbnailUrl}
          alt="Post Img"
          className="aspect-square h-[9.5rem] w-[9.5rem] rounded-lg bg-neutral-bg-10 object-cover"
        />
        <img
          src={postCardIcon}
          alt="Post Card Icon"
          className="absolute bottom-2 left-2"
        />
      </div>
      <h1 className="max-w-[9.5rem] truncate text-subTitle text-neutral-title">
        {data?.title}
      </h1>
    </div>
  );
};
