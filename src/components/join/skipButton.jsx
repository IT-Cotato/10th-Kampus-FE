import { useNavigate } from 'react-router-dom';

export const SkipButton = ({ navigateTo }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(navigateTo)}
      className="h-8 text-neutral-base shadow-[0rem_0rem_.25rem_0rem_rgba(0,0,0,0.25)] w-fit px-7 rounded-3xl text-small"
    >
      skip
    </button>
  );
};
