import { useAuthStore } from '@/stores/useAuthStore';
import { API_DOMAINS } from '@/constants/api';
import { PATH } from '@/routes/path';

// 여러 요청이 동시에 실패 했을 때 용도
let isRefreshing = false;
let failedQueue = [];

const MAX_RETRIES = 3; // 최대 재시도 횟수

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * 요청 인터셉터
 */
export const onRequest = (config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

/**
 * 요청 에러 인터셉터
 */
export const onRequestError = (error) => {
  console.error('[Request Error]', error);
  return Promise.reject(error);
};

/**
 * 응답 에러 인터셉터
 * 401, 403 에러 처리 용도
 */
export const onError = async (error, api) => {
  const originalRequest = error.config;
  const { status } = error.response || {};
  const { setInitializing, clearAccessToken, setAccessToken } =
    useAuthStore.getState();

  const currentRetryCount = originalRequest._retryCount || 0; // 재시도 횟수 확인

  // 401 에러 처리 및 재발급 로직 포함
  if (status === 401 && currentRetryCount < MAX_RETRIES) {
    originalRequest._retryCount = currentRetryCount + 1;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;
    setInitializing(true);

    try {
      const response = await api.post(
        API_DOMAINS.POST_ACCESS_TOKEN,
        {},
        {
          withCredentials: true, // refreshToken 추가
        },
      );

      const authorizationHeader = response.headers.authorization;
      // Bearer 제거하고 값만 파싱
      const newAccessToken = authorizationHeader.split(' ')[1];

      setAccessToken(newAccessToken);

      processQueue(null, newAccessToken);
      return api(originalRequest);
    } catch (refreshError) {
      // 토큰 갱신 자체가 실패하면, 로그아웃 후 로그인 창으로 리다이렉트
      clearAccessToken();
      processQueue(refreshError, null);
      window.location.replace(PATH.LOGIN.BASE);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
      setInitializing(false);
    }
  }

  // 재시도 횟수 초과한 401 에러 처리
  if (status === 401 && currentRetryCount >= MAX_RETRIES) {
    console.error(
      `[Retry Failed] 재시도 횟수(${MAX_RETRIES})를 초과했습니다. 로그아웃 처리합니다.`,
    );
    alert('세션이 만료되었습니다.');
    clearAccessToken();
    setInitializing(false);
    window.location.replace(PATH.LOGIN.BASE);
    return Promise.reject(error);
  }

  // 403 Forbidden 에러 처리
  if (status === 403) {
    console.error('🚫 403 Forbidden 에러. 접근 권한이 없습니다.');
    alert('요청에 대한 접근 권한이 없습니다.');
    setInitializing(false);

    return Promise.reject(error);
  }

  return Promise.reject(error);
};
