import User from '@/assets/imgs/icon/user.svg?react';
import { useGetAdminUserData } from '@/state/query/admin/useGetAdminUserData';

export const Dashboard = () => {
  const { data: userData } = useGetAdminUserData();

  const handleAdministratorPermissionSettings = () => {
    //  관리자 권한 설정 페이지로 이동
    alert('준비 중입니다. 스웨거에서 이용해주세요.');
  };

  return (
    <div className="flex flex-1 flex-row gap-5">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-fit flex-col items-center justify-center gap-3 rounded-xl bg-white px-10 pb-5 pt-6 text-center align-middle lg:px-14 lg:pb-6 lg:pt-10">
          <User className="w-14 lg:w-32" />
          <div>
            <h1 className="flex flex-row items-end justify-center text-pageTitle lg:text-title">
              {userData?.nickname}
              <span className="text-subTitle lg:text-pageTitle">님</span>
            </h1>
            <div className="text-subTitle">관리자</div>
            <div className="text-subTitle">id: {userData?.id}</div>
            <div className="text-subTitle">{userData?.email}</div>
          </div>
        </div>
        <button
          className="w-fit rounded-xl bg-primary-40 px-6 py-4 text-subTitle text-white"
          onClick={handleAdministratorPermissionSettings}
        >
          관리자 권한 설정
        </button>
      </div>
    </div>
  );
};
