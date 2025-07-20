import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { removeTokens } from '@/utils/authUtils';
import { NotificationButton } from '@/components/common/NotificationButton';
import OfficialMail from '@/constants/OfficialMail.json';
import { MyMainData } from '@/components/my/MyMainData';
import { ErrorWrapper } from '@/components/common/error/SuspenseFallback';

export const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await removeTokens();
    navigate(path.login.base, { replace: true });
  };

  return (
    <div className="flex h-full w-full flex-col gap-[1.125rem] p-4">
      {/* 알림 영역 */}
      <div className="flex h-full w-full justify-end">
        <NotificationButton isNotification={false} />
      </div>
      {/* 본문 영역 */}
      <div className="flex h-full w-full flex-col gap-[1.25rem]">
        <ErrorWrapper>
          <MyMainData />
        </ErrorWrapper>
        {/* 마이페이지 항목들 */}
        <div className="mt-[1.25rem] flex h-full w-full flex-col gap-[1.875rem] leading-tight">
          <div className="flex h-full w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Service Settings</div>
            <div className="flex h-full w-full flex-col gap-[.625rem] border-t border-primary-base pt-[.625rem]">
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
          <div className="flex h-full w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Community</div>
            <div className="flex h-full w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
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
          <div className="flex h-full w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Contact Us</div>
            <div className="flex h-full w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
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
                href={`mailto:${OfficialMail.mail}`}
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
          <div className="flex h-full w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">etc.</div>
            <div className="flex h-full w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
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
