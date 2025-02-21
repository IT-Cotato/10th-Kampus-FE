import { getSchoolStatus } from '@/apis/auth/getSchoolStatus.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCheckSchoolStatus = () => {
    const { mutate } = useMutation({
    mutationFn: getSchoolStatus,
    onSuccess: (response) => {
        return response.data;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    mutate,
  };
};
