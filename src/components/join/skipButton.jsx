import { useNavigate } from 'react-router-dom';

export const SkipButton = ({ navigateTo }) => {
  const navigate = useNavigate();

  const handleClickSkip = () => {
    navigate(navigateTo);
  };

  return (
    <button
      onClick={handleClickSkip}
      className="h-8 text-white border bg-primary-30 w-fit px-7 rounded-3xl text-small"
    >
      skip
    </button>
  );
};
