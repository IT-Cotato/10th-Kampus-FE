import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/api";
import { Capacitor } from "@capacitor/core";
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

export const parseTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        accessToken: urlParams.get(ACCESS_TOKEN_KEY),
        refreshToken: urlParams.get(REFRESH_TOKEN_KEY),
    };
};
export const getTokens = async () => {

    // 네이티브 환경과 웹 환경 구분 
    let accessToken, refreshToken
    if (Capacitor.isNativePlatform()) {
        accessToken = await SecureStoragePlugin.get({ key: ACCESS_TOKEN_KEY });
        refreshToken = await SecureStoragePlugin.get({ key: REFRESH_TOKEN_KEY });
    }
    else {
        accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    // 토큰 값이 null인 경우, 로그인 화면으로 redirect
    if (accessToken === null && refreshToken === null) {
        return null;
    }
    else {
        return { accessToken, refreshToken };
    }
};
export const setTokens = async ({ accessToken, refreshToken }) => {
    // 네이티브 환경과 웹 환경 구분
    if (Capacitor.isNativePlatform()) {
        await SecureStoragePlugin.set({ key: ACCESS_TOKEN_KEY, value: accessToken });
        await SecureStoragePlugin.set({ key: REFRESH_TOKEN_KEY, value: refreshToken });
    }
    else {
        accessToken = localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        refreshToken = localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}
export const removeTokens = async () => {
    if (Capacitor.isNativePlatform()) {
        // 네이티브 환경 -> SecureStorage 삭제
        await SecureStoragePlugin.remove({ key: ACCESS_TOKEN_KEY });
        await SecureStoragePlugin.remove({ key: REFRESH_TOKEN_KEY });
    } else {
        // 웹 환경 -> localStorage 삭제
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};