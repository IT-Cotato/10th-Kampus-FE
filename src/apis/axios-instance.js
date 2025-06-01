import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../constants/api';
import { path } from '@/routes/path';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = (url, params, options) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: `Bearer ${accessToken}` },
    params: params,
    //그 외
    ...options,
  });
  return instance;
};

export const authApi = axiosInstance(BASE_URL);

/**
 * CSRF 토큰 fetch 에러 핸들러
 */
const handleFetchCsrfTokenError = (error) => {
  console.error('CSRF 토큰 가져오기 실패:', error);
};

/**
 * CSRF 토큰을 가져와서 저장하는 함수
 */
const fetchCsrfToken = async () => {
  try {
    const response = await userAPI.get(API_DOMAINS.CSRF_TOKEN);
    csrfToken = response.data.csrfToken;
  } catch (error) {
    handleFetchCsrfTokenError(error);
  }
};

/**
 * 응답 인터셉터: 응답 헤더에 새 CSRF 토큰이 존재하면 업데이트
 */
const handleResponseTokenUpdate = (response) => {
  const newToken = response.headers['X-XSRF-TOKEN'];
  if (newToken) {
    csrfToken = newToken;
    console.log('🔄 새로운 CSRF 토큰 적용:', csrfToken);
  }
  return response;
};

/**
 * 에러 응답 핸들러: 각 HTTP 상태코드에 따라 적절한 조치를 수행
 */
const handleErrorResponse = async (error) => {
  const originalRequest = error.config;
  if (error.response) {
    const { status } = error.response;

    // 403 Forbidden: CSRF 토큰 만료 → 새 토큰 요청 후 재시도 (한번만)
    if (status === 403 && originalRequest && !originalRequest._retry) {
      console.warn('⚠️ CSRF 토큰 만료 → 새 토큰을 가져오는 중...');
      originalRequest._retry = true;

      try {
        await fetchCsrfToken();
        originalRequest.headers['X-XSRF-TOKEN'] = csrfToken;
        return userAPI(originalRequest);
      } catch (tokenError) {
        console.error('❌ CSRF 토큰 갱신 실패:', tokenError);
        return Promise.reject(tokenError);
      }
    }

    // 401 Unauthorized: 세션 만료 → 로그아웃 및 리다이렉션
    if (status === 401) {
      console.warn('⚠️ 세션 만료 → 로그아웃 처리 중...');
      try {
        await postLogout();
      } catch (serverLogoutError) {
        console.error('❌ 서버 로그아웃 실패:', serverLogoutError);
      } finally {
        useAuthStore.getState().logout();
      }
      window.location.href = path.login;
      return Promise.reject(error);
    }

    // 440 Login Timeout: 다른 기기 로그인으로 인한 세션 만료
    if (status === 440) {
      console.warn('⚠️ 다른 기기에서 로그인하여 세션이 만료됨.');
      alert('다른 기기에서 로그인하여 로그아웃되었습니다.');
      try {
        await postLogout();
      } catch (serverLogoutError) {
        console.error('❌ 서버 로그아웃 실패:', serverLogoutError);
      } finally {
        useAuthStore.getState().logout();
      }
      window.location.href = path.login;
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

// 요청 및 응답 인터셉터 적용
authApi.interceptors.response.use(
  handleResponseTokenUpdate,
  handleErrorResponse,
);
