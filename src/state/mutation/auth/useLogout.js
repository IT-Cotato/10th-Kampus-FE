import { postLogout } from '@/apis/auth/logout.api';
import { useMutation } from '@tanstack/react-query';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { removeTokens } from '@/utils/authUtils';

export const useLogout = () => {
  const { showSnackbar } = useSnackbarStore();
  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      removeTokens();
      navigate(PATH.LOGIN.BASE, { replace: true });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      showSnackbar('로그아웃 중 오류가 발생했습니다.');
    },
  });

  return mutate;
};
