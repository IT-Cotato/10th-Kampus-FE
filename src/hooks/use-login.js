import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

//import 방법
// const { postLogin } = useLogin();

export const useLogin = () => {
  const queryClient = useQueryClient();

  const postLogin = useMutation({
    mutationKey: [QUERY_KEYS.POST_LOGIN],
    // mutationFn: api 함수,
    onSuccess: () => {
      toast.success('수정되었습니다.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      //invalidate 옵션이 필요할 경우
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER_ME] });
    },
  });

  const getMy = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_ME],
    // queryFn: api 함수,
  });

  return {
    postLogin,
    getMy,
  };
};
