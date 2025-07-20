export function getErrorPayload(error) {
  const response = error?.response;
  const data = response?.data;

  return {
    code: data?.code || data?.errorCode || 'UNKNOWN',
    message: data?.message || '알 수 없는 에러가 발생했습니다.',
    status: response?.status || 500,
  };
}
