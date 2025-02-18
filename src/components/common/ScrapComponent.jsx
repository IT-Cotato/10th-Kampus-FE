import activeScrap from '@/assets/imgs/activeScrap.svg';
import scrap from '@/assets/imgs/scrap.svg';
import { useState } from 'react';
import { StateChangeAnimate, startAnimation } from './StateChangeAnimate';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPostScrap, deletePostScrap } from '@/apis/board/togglePostScrap.api';
import { QUERY_KEYS } from '@/constants/api';
export const ScrapComponent = ({
  state,
  width,
  height,
  id = undefined,
}) => {
  const queryClient = useQueryClient();
  const { mutate: toggleScrap } = useMutation({
    mutationFn: ({ isPinned }) =>
      isPinned ? deletePostScrap({ postId: actualId }) : addPostScrap({ postId: actualId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_LIST] });
      startAnimation(setScrapAni); // 스크랩 애니메이션 시작
    }
  })
  const { postId } = useParams();
  const actualId = postId || id; // 카드뉴스면 전달받은 id, 게시글이면 파라미터에 있는 postId
  const [scrapAni, setScrapAni] = useState(false); // 스크랩 애니메이션 상태

  const handleScrap = () => {
    console.log(actualId)
    toggleScrap({ isPinned: state });
  };
  return (
    <div>
      {scrapAni && (
        <StateChangeAnimate
          state={state}
          changeToTrueText={'Add to scrap'}
          changeToFalseText={'Remove from Scrap'}
        />
      )}
      {state ? ( // currentColor로 색이 안바뀜
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleScrap();
          }}
        >
          <img
            src={activeScrap}
            alt="Bookmarked"
            className="cursor-pointer"
            style={{ width: `${width}`, height: `${height}` }}
          />
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleScrap();
          }}
        >
          <img
            src={scrap}
            alt="Bookmark"
            className="cursor-pointer"
            style={{ width: `${width}`, height: `${height}` }}
          />
        </button>
      )}
    </div>
  );
};
