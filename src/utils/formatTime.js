export const formatTime = (createdTime) => {
  const now = new Date();
  const createdDate = new Date(createdTime);
  // 차이 ms -> sec
  const diff = Math.floor((now.getTime() - createdDate.getTime()) / 1000); // 서버에서 한국 시간대로 줘서 변경
  if (diff < 60) {
    return `now`;
  } else if (diff < 60 * 60) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 60 * 60 * 24) {
    return `${Math.floor(diff / 60 / 60)} hours ago`;
  } else if (diff < 60 * 60 * 24 * 7) {
    return `${Math.floor(diff / 60 / 60 / 24)} days ago`;
  } else {
    if (createdDate.getFullYear() === now.getFullYear()) {
      return createdDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      });
    } else {
      return createdDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
};
