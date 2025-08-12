import { useNavigate } from 'react-router-dom';

export const SkipButton = ({ navigateTo }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(navigateTo)}
      className="h-8 w-fit rounded-3xl px-7 text-small text-neutral-base shadow-[0rem_0rem_.25rem_0rem_rgba(0,0,0,0.25)]"
    >
      skip
    </button>
  );
};
