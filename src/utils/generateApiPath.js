// path에 API_DOMAINS 상수 값 입력, params에 동적 파라미터 넣으면 API 경로 나옵니다
export const generateApiPath = (path, params) => {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`:${key}`, params[key]),
    path,
  );
};
