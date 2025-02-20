import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import { ScrapComponent } from '../common/ScrapComponent';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
export const TipsPostList = ({ data, boardId }) => {
  // 카드 뉴스 부분 데이터 요청 시, 스크랩 여부도 같이 가져와야 함
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between pb-3 pt-5"
      onClick={() => navigate(`${data.postId}`)}
    >
      <div className="flex flex-col justify-between">
        <p className="text-subTitle text-neutral-title">{data.title}</p>
        <div className="flex gap-[0.375rem]">
          <div className="flex items-center gap-1 text-small text-primary-red">
            <Like />
            <p>{data.likes}</p>
          </div>
          <div className="flex items-center gap-1 text-small text-primary-30">
            <Comment />
            <p>{data.comments}</p>
          </div>
          <p className="text-small text-neutral-border-50">
            {formatTime(data.createdTime)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <div className="min-h-[5.75rem] min-w-[5.75rem]">
          {data.thumbnailUrl && (
            <img
              src={data.thumbnailUrl}
              alt="post image"
              className="mx-auto my-auto h-[5.75rem] w-[5.75rem] border-none bg-neutral-bg-10"
            />
          )}
        </div>
        <ScrapComponent
          state={data.isScrapped}
          id={data.postId}
          width="1.875rem"
          height="1.875rem"
          boardId={boardId}
        />
      </div>
    </div>
  );
};
