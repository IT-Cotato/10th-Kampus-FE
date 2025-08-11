import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useDuplicateCheck = (apiFunction) => {
  const { mutate } = useMutation({
    // mutationFn: api 함수,
    mutationFn: apiFunction,
    onSuccess: () => {
      toast.success('중복확인 완료');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    mutate,
  };
};

export default useDuplicateCheck;
