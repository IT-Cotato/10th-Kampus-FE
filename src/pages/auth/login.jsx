import { KakaoLogin } from '@/components/common/kakaoLogin';
import { GoogleLogin } from '@/components/common/googleLogin';
import { useEffect, useState } from 'react';
import { parseTokenFromUrl } from '@/utils/authUtils';
import { getHealth } from '@/apis/auth/login.api';
export const Login = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const tokens = parseTokenFromUrl();
    if (tokens.accessToken || tokens.refreshToken) {
      console.log("Access");
      getHealth(tokens.accessToken)
        .then(response => {   // 서버 응답 확인용 | 응답 받으면 화면에 200 OK가 뜸 
          setData({
            status: response.status,
            statusText: response.statusText
          });
        })
    }
  }, [])
  return (
    <div className="px-5 mx-auto my-auto">
      <KakaoLogin />
      <GoogleLogin />
      {data && (
        <p className='w-4/5 mx-auto mt-6'>{data.status} | {data.statusText}</p>
      )
      }
    </div>
  );
};
