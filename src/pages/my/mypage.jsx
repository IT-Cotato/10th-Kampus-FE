import notification from '@/assets/imgs/notification.svg';
import arrow from '@/assets/imgs/arrowRight.svg';
import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';

export const MyPage = () => {
  const navigate = useNavigate();

  // 백 연동으로 username, university 받아오기
  const username = 'COTATO';
  const university = 'Cotato University';

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col w-full h-full p-4 gap-[1.125rem]">
      {/* 알림 영역 */}
      <div className="flex justify-end w-full h-full">
        <img src={notification} alt="notification button" />
      </div>
      {/* 본문 영역 */}
      <div className="flex flex-col w-full h-full gap-[2.5rem]">
        {/* 마이페이지 메인 버튼 */}
        <div
          className="flex w-full h-full bg-primary-base px-[.75rem] py-[1.625rem] items-center rounded-[.625rem]"
          onClick={() => handleButtonClick(path.mypage.settings.info)}
        >
          <div className="flex flex-col justify-between w-full h-full gap-1 text-white">
            <div className="text-pageTitle">{username}</div>
            <div className="text-neutral-disabled">
              {university ? university : "What's the name of your school?"}
            </div>
          </div>
          <div className="right-0 h-full">
            <img src={arrow} alt="" className="w-[1.25rem] h-[1.25rem]" />
          </div>
        </div>
        {/* 마이페이지 항목들 */}
        <div className="flex flex-col w-full h-full gap-[1.875rem]">
          <div className="flex flex-col w-full h-full gap-2">
            <div className="text-neutral-border-50">Service Settings</div>
            <div className="flex flex-col w-full h-full gap-2 pt-2 border-t border-primary-base">
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.settings.info)}
              >
                My Information
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.settings.verification)}
              >
                School Verification
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.settings.notification)}
              >
                Notifications and Information Agreements
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-2">
            <div className="text-neutral-border-50">Community</div>
            <div className="flex flex-col w-full h-full gap-2 pt-2 border-t border-primary-base">
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.community.scrap)}
              >
                Scrap
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.community.articles)}
              >
                My Articles
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.community.secondhand)}
              >
                Secondhand
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-2">
            <div className="text-neutral-border-50">Customer Service</div>
            <div className="flex flex-col w-full h-full gap-2 pt-2 border-t border-primary-base">
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.service.base)}
              >
                Contact Us
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.service.base)}
              >
                1:1 Inquiry
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.service.base)}
              >
                Notice
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full h-full gap-2">
            <div className="text-neutral-border-50">etc.</div>
            <div className="flex flex-col w-full h-full gap-2 pt-2 border-t border-primary-base">
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick(path.mypage.block)}
              >
                Blocking Management
              </button>
              <button
                type="button"
                className="text-left"
                onClick={() => handleButtonClick('/')}
              >
                Log Out
              </button>
              <button
                type="button"
                className="text-left text-neutral-border-50"
                onClick={() => handleButtonClick(path.mypage.delete)}
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
