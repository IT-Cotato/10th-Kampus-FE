export const urlToFile = async (url, order) => {
  const response = await fetch(url, {
    cache: 'no-store',
    mode: 'cors',
  });
  const blob = await response.blob();

  // url에서 확장자 추출
  const urlPath = new URL(url).pathname;
  const extMatch = urlPath.match(/\.\w+$/); // 마침표 + 문자/숫자 1개 이상 + 문자열 끝까지

  const extension = extMatch ? extMatch[0] : '.jpeg';

  const fileName = `${order}${extension}`;
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
