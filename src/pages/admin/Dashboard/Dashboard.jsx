import User from '@/assets/imgs/admin/User.svg?react';
export const Dashboard = () => {
  const handleAdministratorPermissionSettings = () => {
    //  관리자 권한 설정 페이지로 이동
  };
  return (
    <div className="flex flex-1 flex-row gap-5">
      <div className="flex h-fit w-full flex-col gap-5">
        <h1 className="text-pageTitle">가입자 요약</h1>
        <div className="flex w-full gap-10 rounded-xl bg-white p-10">
          <div className="w-full">통계~</div>
          <div className="flex flex-col whitespace-nowrap">
            <span>누적 회원: 0</span>
            <span>오늘의 신규 회원: 0</span>
            <span>누적 탈퇴 회원: 0</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-6 rounded-xl bg-white px-10 pb-5 pt-6 text-center align-middle lg:px-14 lg:pb-6 lg:pt-10">
          <User className="w-24 lg:w-32" />
          <div>
            <h1 className="text-pageTitle lg:text-title">
              김감자<span className="text-subTitle lg:text-pageTitle">님</span>
            </h1>
            <div className="text-subTitle">관리자</div>
          </div>
          <div></div>
        </div>
        <button
          className="rounded-xl bg-primary-40 p-4 text-subTitle text-white"
          onClick={handleAdministratorPermissionSettings}
        >
          관리자 권한 설정
        </button>
      </div>
    </div>
  );
};
