export const formatPrice = (price) => {
  if (price === '' || price === undefined) return '';
  return Number(price).toLocaleString('ko-KR');
};
