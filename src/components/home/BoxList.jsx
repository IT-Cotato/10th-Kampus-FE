import { generateBoardTitle } from '@/utils/boardTitleUtils';
import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import postCardIcon from '@/assets/imgs/postCardIcon.svg';

export const BoxList = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center gap-5 py-[.625rem]"
      onClick={() =>
        navigate(
          `${path.board.base}/${generateBoardTitle(text.board)}/${text.postID}`,
        )
      }
    >
      <h1 className="text-subTitle text-neutral-title">{text.board}</h1>
      <h2 className="truncate text-base text-neutral-base">{text.title}</h2>
    </div>
  );
};
export const CardPost = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col gap-[.625rem]"
      onClick={() =>
        navigate(`${path.board.base}/tips-for-living-in-korea/${data.postID}`)
      }
    >
      <div className="relative">
        <img
          src={data.img}
          alt="Post Img"
          className="aspect-square min-h-[9.5rem] min-w-[9.5rem] rounded-lg bg-neutral-bg-10"
        />
        <img
          src={postCardIcon}
          alt="Post Card Icon"
          className="absolute bottom-2 left-2"
        />
      </div>
      <h1 className="truncate text-subTitle text-neutral-title">
        {data.title}
      </h1>
    </div>
  );
};
