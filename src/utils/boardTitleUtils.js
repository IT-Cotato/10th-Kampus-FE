export const generateBoardTitle = (title) => {
  const changeTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 슬래시 같은 특수문자 처리
    .replace(/\s+/g, '-') // 공백을 하이픈으로 변경
    .replace(/--+/g, '-'); // 하이픈 두 개 이상은 한 개로 변경
  if (changeTitle === 'favorites') return '';
  else return changeTitle;
}; // 게시판 -> 게시글로 갈 때 게시글의 제목을 어떻게 할 지 백엔드와 상의 후 변경
