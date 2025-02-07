export const touchDrag = (startX, currentX, setActiveSlide, data) => {
  const diffX = startX - currentX;

  if (diffX > 50) {
    setActiveSlide(data.id);
  } else if (diffX < -50) {
    setActiveSlide(null);
  }
};
