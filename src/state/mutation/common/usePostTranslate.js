import {
  postTranslateMarket,
  postTranslatePost,
} from '@/apis/translate/handleTranslate.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const usePostTranslate = (type = 'board', id) => {
  const queryClient = useQueryClient();
  const [translateState, setTranslateState] = useState(false);
  const [translatedPost, setTranslatedPost] = useState(null);
  const handleTranslate = () => {
    if (translatedPost) {
      setTranslateState(true);
    } else if (type === 'board') {
      postTranslate(id);
    } else if (type === 'market') {
      productTranslate(id);
    }
  };
  const { mutate: postTranslate, isPending: translatePostPending } =
    useMutation({
      mutationFn: () => {
        return postTranslatePost({ postId: id });
      },
      onSuccess: (translatedPost) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_TRANSLATE_POST, id],
        });
        setTranslateState(true);
        setTranslatedPost(translatedPost);
      },
    });

  const { mutate: productTranslate, isPending: translateProductPending } =
    useMutation({
      mutationFn: () => {
        return postTranslateMarket({ productId: id });
      },
      onSuccess: (translatedPost) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_TRANSLATE_PROUDCT, id],
        });
        setTranslateState(true);
        setTranslatedPost(translatedPost);
      },
    });
  if (type === 'board') {
    return {
      translateState,
      setTranslateState,
      translatedPost,
      setTranslatedPost,
      translatePostPending,
      handleTranslate,
    };
  } else {
    return {
      translateState,
      setTranslateState,
      translatedPost,
      setTranslatedPost,
      translateProductPending,
      handleTranslate,
    };
  }
};
