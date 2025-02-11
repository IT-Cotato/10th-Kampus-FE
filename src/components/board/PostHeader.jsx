import Prev from '@/assets/imgs/previous.svg?react';
import Search from '@/assets/imgs/search.svg?react';
import { BoardMenuBar } from '../common/MenuBar';
import { useNavigate, useParams } from 'react-router-dom';

export const PostHeader = ({ path }) => {
  const { boardTitle } = useParams();
  const navigate = useNavigate();

  return (
    <div className="fixed flex w-full max-w-[512px] items-center justify-between border-b-[0.5px] border-[#D8D8D8] bg-white px-4 py-4">
      <Prev className="h-5 w-5 cursor-pointer" onClick={() => navigate(-1)} />
      <p className="absolute left-1/2 -translate-x-1/2 transform whitespace-nowrap text-subTitle font-medium text-neutral-title">
        {boardTitle}
      </p>
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(path.search)}>
          <Search className="h-6 w-6 cursor-pointer text-neutral-title" />
        </button>
        <BoardMenuBar />
      </div>
    </div>
  );
};
