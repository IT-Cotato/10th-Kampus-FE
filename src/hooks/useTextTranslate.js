import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { translateText } from '@/apis/translate/translateText.api';
import { QUERY_KEYS } from '@/constants/api';

export const useTextTranslate = (content) => {
  const [translateState, setTranslateState] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const queryClient = useQueryClient();
  const { mutate: textTranslate, isPending: translatePending } = useMutation({
    mutationFn: async (content) => {
      return await translateText({ content });
    },
    onSuccess: (translatedContent) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_TRANSLATE_TEXT, content],
      });
      setTranslateState(true);
      setTranslatedContent(translatedContent.content);
    },
  });

  const handleTranslate = () => {
    if (translatedContent) {
      setTranslateState(true);
    } else {
      textTranslate(content);
    }
  };

  return {
    translateState,
    setTranslateState,
    translatedContent,
    setTranslatedContent,
    translatePending,
    handleTranslate,
  };
};
