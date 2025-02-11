import notification from '@/assets/imgs/notification.svg';
import arrow from '@/assets/imgs/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';

export const MyPage = () => {
  const navigate = useNavigate();

  // 백 연동으로 username, university 받아오기
  const username = 'COTATO';
  const university = 'Cotato University';

  return (
    <div className="flex h-full w-full flex-col gap-[1.125rem] p-4">
      {/* 알림 영역 */}
      <div className="flex h-full w-full justify-end">
        <img src={notification} alt="notification button" />
      </div>
      {/* 본문 영역 */}
      <div className="flex h-full w-full flex-col gap-[2.5rem]">
        {/* 마이페이지 메인 버튼 */}
        <div
          className="flex h-full w-full items-center rounded-[.625rem] bg-primary-base px-[.75rem] py-[1.625rem]"
          onClick={() => navigate(path.mypage.settings.info)}
        >
          <div className="flex h-full w-full flex-col justify-between gap-1 text-white">
            <div className="text-pageTitle">{username}</div>
            <div className="text-neutral-disabled">
              {university ? university : "What's the name of your school?"}
            </div>
          </div>
          <div className="right-0 h-full">
            <img src={arrow} alt="" className="h-[1.25rem] w-[1.25rem]" />
          </div>
        </div>
        {/* 마이페이지 항목들 */}
        <div className="flex h-full w-full flex-col gap-[1.875rem]">
          <div className="flex flex-col w-full h-full gap-2">
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
              <button
                type="button"
                className="text-left"
                onClick={() =>
                  navigate(
                    `${path.mypage.service.base}/${path.mypage.service.inquiry}`,
                  )
                }
              >
                1:1 Inquiry
              </button>
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
                onClick={() => navigate('/')}
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
