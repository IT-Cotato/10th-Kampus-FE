// @ts-nocheck
import React, { useEffect, useState } from 'react';
import KakaoLogo from '@/assets/imgs/kakaoLogo.svg';
import { parseTokenFromUrl } from '@/utils/authUtils';
import { App } from '@capacitor/app';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const KakaoLogin = () => {
  const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
  const redirectUri =
    import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_KAKAO_REDIRECT_URI;
  App.addListener('appUrlOpen', async (event) => {
    const url = event.url; // 전달받은 URL 예: kampus://login?accessToken=abc123&refreshToken=xyz456

    if (url.startsWith('kampus://login')) {
      const parsedUrl = new URL(url);
      const accessToken = parsedUrl.searchParams.get('accessToken');
      const refreshToken = parsedUrl.searchParams.get('refreshToken');
      if (accessToken && refreshToken) {
        alert('카카오 로그인 성공');
        await SecureStoragePlugin.set({
          key: 'accessToken',
          value: accessToken,
        });
        await SecureStoragePlugin.set({
          key: 'refreshToken',
          value: refreshToken,
        });
      }
    }
  });

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey); // 카카오 JS 키
    }

    // 나중에 앱으로 redirect Uri 구현되면 삭제할 코드들
    const { accessToken, refreshToken } = parseTokenFromUrl();
    if (accessToken && refreshToken) {
      const appUrl = ` kampus://login?accessToken=${accessToken}&refreshToken=${refreshToken}`;
      if (!window.Capacitor.isNativePlatform()) {
        window.location.href = appUrl;
      }
    }
  }, []);

  const handleKakaoAuthorize = () => {
    window.Kakao.Auth.authorize({
      redirectUri,
      scope: 'account_email',
    });
  };
  return (
    <button
      type="button"
      onClick={handleKakaoAuthorize}
      className="flex h-[52px] w-full items-center justify-center gap-[16px] rounded-[12px] bg-[#FEE500] px-[12px] text-center align-middle shadow-navbar"
    >
      <img src={KakaoLogo} className="h-[20px] w-[20px]" />
      <span className="text-[16px] leading-[20px] text-[#191919] font-roboto">
        Start with Kakao
      </span>
    </button>
  );
};
