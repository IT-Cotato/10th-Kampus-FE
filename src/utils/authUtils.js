import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/api";
export const parseTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        accessToken: urlParams.get(ACCESS_TOKEN_KEY),
        refreshToken: urlParams.get(REFRESH_TOKEN_KEY)
    };
};