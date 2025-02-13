import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const ArticleInfo = ({ boardName, postName, postId }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-nuetral-5 flex w-full flex-col items-start justify-center p-4 text-neutral-base">
      <p className="text-base">{boardName}</p>
      <p className="text-pageTitle text-neutral-title">{postName}</p>
      <button
        className="h-10 w-full rounded-lg border border-neutral-border-30 bg-white text-small"
        onClick={() => {
          navigate(`${path.board.base}/${postId}`);
        }}
      >
        Go to the article
      </button>
    </div>
  );
};
