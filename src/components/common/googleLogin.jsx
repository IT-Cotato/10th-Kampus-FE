// @ts-nocheck

import React, { useEffect } from "react";
import googleLoginImg from '@/assets/imgs/loginGoogle.svg';

export const GoogleLogin = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  function handleGoogleLogin() {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: googleClientId,
      scope: 'https://www.googleapis.com/auth/userinfo.email', // 원하는 권한 범위
      ux_mode: 'popup', // 팝업 방식으로 인증
      callback: (response) => {
        if (response.code) {
          const authCode = response.code;
          console.log('Authorization Code:', authCode);

          const redirectUrl = `${redirectUri}?code=${authCode}`;
          window.location.href = redirectUrl;
        }
      },
    });

    client.requestCode();
  }
  return (
    <img
      src={googleLoginImg}
      alt="Google Login"
      onClick={handleGoogleLogin}
      className="w-4/5 mx-auto mt-6 cursor-pointer"
    />
  );
};