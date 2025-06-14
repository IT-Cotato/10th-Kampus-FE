import { postWriteTranslate } from '@/apis/translate/handleTranslate.api';
import { useMutation } from '@tanstack/react-query';

export const usePostWriteTranslate = (
  setTranslatedTitle,
  setTranslatedContent,
) => {
  const mutate = useMutation({
    mutationFn: (data) => postWriteTranslate({ data }),
    onSuccess: (response) => {
      setTranslatedTitle(response.title);
      setTranslatedContent(response.content);
    },
  });

  return mutate;
};
