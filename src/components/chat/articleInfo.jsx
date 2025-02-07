import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const ArticleInfo = ({ boardName, postName, postId }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-center w-full p-4 bg-nuetral-5 text-neutral-base">
      <p className="text-base">{boardName}</p>
      <p className="text-pageTitle text-neutral-title">{postName}</p>
      <button
        className="w-full h-10 bg-white border rounded-lg border-neutral-border-30 text-small"
        onClick={() => {
          navigate(`${path.board.base}/${postId}`);
        }}
      >
        Go to the article
      </button>
    </div>
  );
};
