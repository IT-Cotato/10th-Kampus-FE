import { useNavigate } from 'react-router-dom';
import { path } from '@/routes/path';
import { ButtonRound, BUTTON_THEMES } from '@/components/common/ButtonRound';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-6 font-bold text-red-500">403</div>
        <h1 className="text-2xl mb-4 font-bold text-gray-800">
          접근 권한이 없습니다
        </h1>
        <p className="mb-8 text-gray-600">
          관리자 권한이 필요한 페이지입니다.
          <br />
          일반 사용자는 접근할 수 없습니다.
        </p>
        <div className="flex justify-center gap-4">
          <ButtonRound
            text="홈으로 돌아가기"
            onClick={() => navigate(path.home, { replace: true })}
            theme={BUTTON_THEMES.BASE}
          />
          <ButtonRound
            text="이전 페이지"
            onClick={() => navigate(-1)}
            theme={BUTTON_THEMES.OUTLINE}
          />
        </div>
      </div>
    </div>
  );
};
