import arrow from '@/assets/imgs/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { removeTokens } from '@/utils/authUtils';
import { useEffect, useState } from 'react';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/apis/user/userDetail.api';
import { NotificationButton } from '@/components/common/NotificationButton';
import { useCheckSchoolStatus } from '@/hooks/use-CheckSchoolStatus';
import { Loading } from '@/components/common/Loading';

export const MyPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [status, setStatus] = useState(''); // 학교 인증 상태

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

  const { mutate: checkSchoolStatus, isLoading: isSchoolStatusLoading } =
    useCheckSchoolStatus();

  useEffect(() => {
    checkSchoolStatus(undefined, {
      onSuccess: (data) => {
        setStatus(data.status);
      },
      onError: (error) => {
        alert(error);
      },
    });
  }, []);

  const handleLogout = async () => {
    await removeTokens();
    navigate(path.login);
  };

  return (
    <div className="flex h-full w-full flex-col gap-[1.125rem] p-4">
      {/* 알림 영역 */}
      <div className="flex h-full w-full justify-end">
        <NotificationButton isNotification={false} />
      </div>
      {/* 본문 영역 */}
      <div className="flex h-full w-full flex-col gap-[2.5rem]">
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
                  {university
                    ? university
                    : status === 'PENDING'
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
        {/* 마이페이지 항목들 */}
        <div className="flex h-full w-full flex-col gap-[1.875rem]">
          <div className="flex h-full w-full flex-col gap-2">
            <div className="text-neutral-border-50">Service Settings</div>
            <div className="flex h-full w-full flex-col gap-2 border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.settings.info)}
              >
                My Information
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(`../${path.signup.base}/${path.signup.school}`)
                }
              >
                School Verification
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.settings.notification)}
              >
                Notifications and Information Agreements
              </button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="text-neutral-border-50">Community</div>
            <div className="flex h-full w-full flex-col gap-2 border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.community.scrap.base)}
              >
                Scrap
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.community.article.base)}
              >
                My Article
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.community.secondhand)}
              >
                Secondhand
              </button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="text-neutral-border-50">Contact Us</div>
            <div className="flex h-full w-full flex-col gap-2 border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(
                    `${path.mypage.service.base}/${path.mypage.service.faq}`,
                  )
                }
              >
                FAQ
              </button>
              <a
                aria-label="1:1 Inquiry button"
                className="text-left"
                href="mailto:kampus.contact@gmail.com"
              >
                1:1 Inquiry
              </a>
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(
                    `${path.mypage.service.base}/${path.mypage.service.notice}`,
                  )
                }
              >
                Notice
              </button>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="text-neutral-border-50">etc.</div>
            <div className="flex h-full w-full flex-col gap-2 border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(path.mypage.block.base)}
              >
                Blocking Management
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleLogout()}
              >
                Log Out
              </button>
              <button
                type="button"
                className="text-left text-neutral-border-50"
                onClick={() => navigate(path.mypage.delete)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
