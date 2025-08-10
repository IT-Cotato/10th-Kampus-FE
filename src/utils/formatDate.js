const formatDateWithOptions = (options) => {
  return new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Seoul',
    ...options,
  });
};

export const formatMonth = () => formatDateWithOptions({ month: 'long' });

export const formatDate = () => formatDateWithOptions({ day: 'numeric' });
