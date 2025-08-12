import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import articleIcon from '@/assets/imgs/icon/article.svg';

export const BoxList = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center gap-5 whitespace-nowrap px-5 py-2.5"
      onClick={() => navigate(`${PATH.BOARD.BASE}/${text.boardId}`)}
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
      onClick={() => navigate(`${PATH.BOARD.BASE}/5/${data.postId}`)}
    >
      <div className="relative">
        <img
          src={data?.thumbnailUrl}
          alt="Post Img"
          className="aspect-square h-[9.5rem] w-[9.5rem] rounded-lg bg-neutral-bg-10 object-cover"
        />
        <img
          src={articleIcon}
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
