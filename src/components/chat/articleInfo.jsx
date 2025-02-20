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
    <div className="flex flex-col items-start justify-center w-full p-4 bg-neutral-bg-5 text-neutral-base">
      <p className="text-base">{boardName}</p>
      <p className="text-pageTitle text-neutral-title">{postName}</p>
      <button
        className="w-full h-10 bg-white border rounded-lg border-neutral-border-30 text-small"
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
