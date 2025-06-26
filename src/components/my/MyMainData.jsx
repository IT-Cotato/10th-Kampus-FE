import { getUser } from '@/apis/user/userDetail.api';
import { Loading } from '@/components/common/Loading';
import { QUERY_KEYS } from '@/constants/api';
import { ERR_MSG } from '@/constants/errorMessage';
import { UNIV_STATUS } from '@/constants/universityStatus';
import { useCheckSchoolStatus } from '@/hooks/useCheckSchoolStatus';
import { path } from '@/routes/path';
import arrow from '@/assets/imgs/arrowRight.svg';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MyMainData = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');

  const { data: userData, isLoading: isUserDetailsLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (userData) {
      setUsername(userData.nickname);
      setUniversity(userData.universityCode);
    }
  }, [userData]);

  const {
    data: status,
    isLoading: isSchoolStatusLoading,
    isError: isSchoolStatusError,
  } = useCheckSchoolStatus();

  return (
    <>
      {/* 마이페이지 메인 버튼 */}
      <div
        className="flex h-full w-full cursor-pointer items-center rounded-[.625rem] bg-primary-base px-[.75rem] py-[1.625rem]"
        onClick={() => navigate(path.mypage.settings.info)}
      >
        {isUserDetailsLoading && isSchoolStatusLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex h-full w-full flex-col justify-between gap-1 text-white">
              <div className="text-pageTitle">{username}</div>
              <div className="text-neutral-disabled">
                {isSchoolStatusError
                  ? ERR_MSG
                  : university
                    ? university
                    : status === UNIV_STATUS.PENDING
                      ? 'School verification is in progress.'
                      : "What's the name of your school?"}
              </div>
            </div>
            <div className="right-0 h-full">
              <img src={arrow} alt="" className="h-[1.25rem] w-[1.25rem]" />
            </div>
          </>
        )}
      </div>
      {/* 학교 인증 시 반려 시, 실패 네비게이트 페이지 버튼 */}
      {status === UNIV_STATUS.REJECTED && (
        <button
          onClick={() =>
            navigate(`${path.mypage.base}/${path.mypage.verify.fail}`)
          }
          className="w-full rounded-[.625rem] border border-primary-red px-[1.125rem] py-[1.25rem] text-base leading-none text-primary-red"
        >
          You failed to verify yourself as a student
        </button>
      )}
    </>
  );
};
