// @ts-nocheck
import React, { useEffect } from "react";
import { parseTokenFromUrl } from "@/utils/authUtils";
import { getHealth } from "@/apis/auth/login.api";
import kakaoLoginImg from '@/assets/imgs/loginKakao.png';
export const KakaoLogin = () => {
    const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
    const redirectUri = import.meta.env.VITE_API_BASE_URL + import.meta.env.VITE_KAKAO_REDIRECT_URI;

    useEffect(() => {
        // Kakao SDK 초기화
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey); // 카카오 JS 키
            console.log('Kakao SDK Initialized:', window.Kakao.isInitialized());
        }
        const tokens = parseTokenFromUrl();
        if (tokens.accessToken || tokens.refreshToken) {
            console.log("Access");
            getHealth();
        }
    }, []);
    const handleKakaoAuthorize = () => {
        window.Kakao.Auth.authorize({
            redirectUri,
            scope: 'account_email'
        })
    }
    return (
        <img src={kakaoLoginImg} alt="Kakao Login" onClick={handleKakaoAuthorize} className="w-4/5 mx-auto mt-6 cursor-pointer" />
    );
};