import Like from '../../assets/imgs/like.svg?react';
import Comment from '../../assets/imgs/comment.svg?react';
import Translate from '../../assets/imgs/translate.svg?react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '@/utils/formatTime';
import { useState } from 'react';
import { Translating } from '../common/Translating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { translatePost } from '@/apis/translate/translatePost.api';
import { QUERY_KEYS } from '@/constants/api';
export const PostList = ({ data, isActive, ...props }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [translateState, setTranslateState] = useState(false);
  const [translatedPost, setTranslatedPost] = useState(null);
  const { mutate: postTranslate, isPending: translatePending } = useMutation({
    mutationFn: async (postId) => {
      return await translatePost({ postId: postId });
    },
    onSuccess: (response, postId) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSLATE_POST_LIST, postId],
      });
      setTranslatedPost(response);
      setTranslateState(true);
    },
  });
  const handleTranslate = () => {
    if (translatedPost) {
      setTranslateState(true);
    } else {
      postTranslate(data.id);
    }
  };

  const handleOnClick = (data) => {
    if (props.onClick) {
      props.onClick(data);
    } else {
      navigate(`${data.id}`);
    }
  };
  return (
    <div
      className="flex flex-col gap-3 pt-4 pb-3 cursor-pointer"
      onClick={() => handleOnClick(data)}
    >
      {isActive /** 인기 게시판 레이아웃 */ && (
        <div className="w-fit rounded-md bg-primary-10 px-[0.625rem] py-[0.3125rem] text-small text-neutral-base">
          {data.board_type || data.boardName}
        </div>
      )}
      <div className="flex justify-between gap-3">
        <div className="relative flex flex-col line-clamp-3">
          <h1 className="truncate text-subTitle text-neutral-title">
            <span className={translatePending ? 'opacity-0' : 'opacity-100'}>
              {translateState ? translatedPost.title : data?.title}
            </span>
          </h1>
          <h2 className="line-clamp-2 text-neutral-base">
            <span className={translatePending ? 'opacity-0' : 'opacity-100'}>
              {translateState ? translatedPost.content : data?.content}
            </span>
          </h2>
          {translatePending && (
            <div className="absolute left-0 -translate-y-1/2 top-1/2">
              <Translating width={'3rem'} height={'3rem'} />
            </div>
          )}
        </div>
        <div className="min-h-20 min-w-20">
          {data.thumbnailUrl && (
            <img
              src={data.thumbnailUrl}
              alt="post image"
              className="object-cover w-20 h-20"
            />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            translateState ? setTranslateState(false) : handleTranslate();
          }}
        >
          <Translate className="text-neutral-title" />
        </button>
      </div>
    </div>
  );
};
