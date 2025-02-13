import Logo from '@/assets/imgs/kampusLogo.svg?react';
import { KakaoLogin } from '@/components/common/kakaoLogin';
import { GoogleLogin } from '@/components/common/googleLogin';
import { useEffect, useState } from 'react';
import { parseTokenFromUrl } from '@/utils/authUtils';
import { getHealth } from '@/apis/auth/login.api';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/api';
export const Login = () => {
  const [data, setData] = useState();
  useEffect(() => {
    /*const tokens = parseTokenFromUrl();
    if (tokens.accessToken || tokens.refreshToken) {
      console.log("Access");
      getHealth(tokens.accessToken)
        .then(response => {   // 서버 응답 확인용 | 응답 받으면 화면에 200 OK가 뜸 
          setData({
            status: response.status,
            statusText: response.statusText
          });
        })
    }*/
    const checkTokens = async () => {
      // SecureStorage에서 토큰 값을 비동기적으로 가져옵니다.
      const accessToken = await SecureStoragePlugin.get({
        key: ACCESS_TOKEN_KEY,
      });
      const refreshToken = await SecureStoragePlugin.get({
        key: REFRESH_TOKEN_KEY,
      });

      // 토큰 값이 null이 아닌 경우에만 작업을 수행합니다.
      if (accessToken !== null || refreshToken !== null) {
        // accessToken을 사용하여 API 호출
        getHealth(accessToken)
          .then((response) => {
            alert(response.status);
            setData({
              status: response.status,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
    checkTokens();
  }, []);
  return (
    <div className="flex items-center flex-1">
      <div className="flex flex-col items-center justify-center w-full gap-6 px-8 -translate-y-12">
        <Logo className="w-40 text-primary-base" />
        <div className="flex flex-col w-full gap-4">
          <KakaoLogin />
          <GoogleLogin />
        </div>
      </div>
      {data && <p className="w-4/5 mx-auto mt-6">{data.status}</p>}
    </div>
  );
};
