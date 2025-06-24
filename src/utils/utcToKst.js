export const utcToKst = (utcDate) => {
  const date = new Date(utcDate);
  // UTC+9 = KST
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstDate.toISOString();
};

export const kstToUtc = (kstDate) => {
  const date = new Date(kstDate);
  // KST-9 = UTC
  const utcDate = new Date(date.getTime() - 9 * 60 * 60 * 1000);
  return utcDate.toISOString();
};

export const parseToDate = (utcDate) => {
  const date = new Date(utcDate);
  const yy = date.getUTCFullYear().toString().slice(-2); // 연도
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월 (0부터 시작)
  const dd = String(date.getUTCDate()).padStart(2, '0'); // 일
  const hh = String(date.getHours()).padStart(2, '0'); // 시
  const mi = String(date.getMinutes()).padStart(2, '0'); // 분
  const se = String(date.getSeconds()).padStart(2, '0'); // 시

  return { yy, mm, dd, hh, mi, se };
};

export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatChatTime(date, timeObj) {
  if (isSameDay(date, new Date())) {
    return `${timeObj.hh}:${timeObj.mi}`;
  }
  return `${timeObj.mm}월 ${timeObj.dd}일`;
}
