import { path } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const ArticleInfo = ({
  boardName,
  postName,
  postId,
  boardId,
  dataDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-start justify-center bg-neutral-bg-5 p-4 text-neutral-base">
      <p className="text-base">{boardName}</p>
      <p className="text-pageTitle text-neutral-title">{postName}</p>
      <button
        className="h-10 w-full rounded-lg border border-neutral-border-30 bg-white text-small"
        onClick={() => {
          !dataDelete
            ? navigate(`${path.board.base}/${boardId}/${postId}`)
            : alert('삭제된 게시글 입니다.');
        }}
      >
        Go to the article
      </button>
    </div>
  );
};
