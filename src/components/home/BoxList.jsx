import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import ArticleIcon from '@/assets/imgs/icon/article.svg?react';

export const BoxList = ({ list, isUniversity, isTrending }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center gap-5 whitespace-nowrap px-5 py-2.5"
      onClick={() => {
        if (isUniversity || isTrending) {
          navigate(`${PATH.BOARD.BASE}/${list.boardId}/${list.postId}`);
        } else {
          navigate(`${PATH.BOARD.BASE}/${list.boardId}`);
        }
      }}
    >
      {!isUniversity && (
        <h1 className="text-subTitle text-neutral-title">{list?.boardName}</h1>
      )}
      <h2 className="truncate text-base text-neutral-base">
        {list?.postTitle}
      </h2>
    </div>
  );
};

export const CardPost = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex min-w-[9.5rem] flex-col gap-[.625rem] whitespace-nowrap"
      onClick={() => navigate(`${PATH.BOARD.BASE}/1/${data.postId}`)}
    >
      <div className="relative">
        <img
          src={data?.thumbnailUrl}
          alt={data?.title + ' thumbnail'}
          className="flex aspect-square h-[9.5rem] w-[9.5rem] rounded-lg bg-neutral-bg-10 object-cover"
        />
        <ArticleIcon className="absolute bottom-2 left-2" aria-hidden="true" />
      </div>
      <h1 className="max-w-[9.5rem] truncate text-subTitle text-neutral-title">
        {data?.title}
      </h1>
    </div>
  );
};
