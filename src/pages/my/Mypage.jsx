import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { removeTokens } from '@/utils/authUtils';
import OfficialMail from '@/constants/officialMail.json';
import { MyMainData } from '@/components/my/MyMainData';
import { ErrorWrapper } from '@/components/common/error/SuspenseFallback';

export const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await removeTokens();
    navigate(PATH.LOGIN.BASE, { replace: true });
  };

  return (
    <div className="flex h-full w-full flex-col gap-[1.125rem] p-4">
      {/* 본문 영역 */}
      <div className="flex h-full w-full flex-col gap-[1.25rem]">
        <ErrorWrapper>
          <MyMainData />
        </ErrorWrapper>
        {/* 마이페이지 항목들 */}
        <div className="mt-[1.25rem] flex h-full w-full flex-col gap-[1.875rem] leading-tight">
          <div className="flex h-fit w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Service Settings</div>
            <div className="flex h-fit w-full flex-col gap-[.625rem] border-t border-primary-base pt-[.625rem]">
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(PATH.MYPAGE.SETTINGS.INFO)}
              >
                My Information
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(`${PATH.SIGNUP.BASE}/${PATH.SIGNUP.SCHOOL}`)
                }
              >
                School Verification
              </button>
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Community</div>
            <div className="flex h-fit w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(PATH.MYPAGE.COMMUNITY.SCRAP.BASE)}
              >
                Scrap
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => navigate(PATH.MYPAGE.COMMUNITY.ARTICLE.BASE)}
              >
                My Article
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(
                    `${PATH.MYPAGE.COMMUNITY.ARTICLE.BASE}/${PATH.MYPAGE.COMMUNITY.ARTICLE.MARKET}`,
                  )
                }
              >
                Secondhand
              </button>
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">Contact Us</div>
            <div className="flex h-fit w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(
                    `${PATH.MYPAGE.SERVICE.BASE}/${PATH.MYPAGE.SERVICE.FAQ}`,
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
                    `${PATH.MYPAGE.SERVICE.BASE}/${PATH.MYPAGE.SERVICE.NOTICE}`,
                  )
                }
              >
                Notice
              </button>
            </div>
          </div>
          <div className="flex h-fit w-full flex-col gap-[.625rem]">
            <div className="text-neutral-border-50">etc.</div>
            <div className="flex h-fit w-full flex-col gap-[.625rem] border-t border-primary-base pt-2">
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
                onClick={() => navigate(PATH.MYPAGE.DELETE)}
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
