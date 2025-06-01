// @ts-nocheck
import React, { useEffect, useState } from 'react';
import KakaoLogo from '@/assets/imgs/KakaoLogo.svg';
import { parseTokenFromUrl } from '@/utils/authUtils';
import { App } from '@capacitor/app';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const KakaoLogin = () => {
  const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
  const redirectUri =
    //import.meta.env.VITE_API_SOCKET_URL
    'https://020c-221-149-135-127.ngrok-free.app' +
    import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey); // 카카오 JS 키
    }
  }, []);

  const handleKakaoAuthorize = () => {
    window.Kakao.Auth.authorize({
      redirectUri,
      scope: 'account_email',
      throughTalk: false, // 카카오 앱이 아닌 브라우저 로그인하게 하는 옵션
    });
  };
  return (
    <button
      type="button"
      onClick={handleKakaoAuthorize}
      className="flex h-[52px] w-full items-center justify-center gap-[16px] rounded-[12px] bg-[#FEE500] px-[12px] text-center align-middle shadow-navbar"
    >
      <img src={KakaoLogo} className="h-[20px] w-[20px]" />
      <span className="font-roboto text-[16px] leading-[20px] text-[#191919]">
        Start with Kakao
      </span>
    </button>
  );
};
