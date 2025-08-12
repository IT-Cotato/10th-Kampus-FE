import { MainButton } from '@/components/common/MainButton';
import { SkipHeader } from '@/components/join/SkipHeader';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

export const FailedVerify = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col gap-10">
      <SkipHeader />
      <div className="flex flex-col items-center gap-6 px-4">
        <h1 className="text-pageTitle leading-tight text-neutral-title">
          Why verification failed
        </h1>
        <img className="h-60 w-60 rounded-md bg-neutral-border-30" />
        <article className="h-fit min-h-32 w-full rounded-[.625rem] px-4 py-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"></article>
        <div className="flex w-full flex-col gap-2">
          <MainButton
            onClick={() =>
              navigate(
                PATH.SIGNUP.BASE +
                  '/' +
                  PATH.SIGNUP.VERIFY.BASE +
                  '/' +
                  PATH.SIGNUP.VERIFY.FILE,
              )
            }
          >
            New file Upload
          </MainButton>
          <MainButton
            color="white"
            onClick={() =>
              navigate(PATH.SIGNUP.BASE + '/' + PATH.SIGNUP.SCHOOL)
            }
          >
            Restart Verification
          </MainButton>
        </div>
      </div>
    </div>
  );
};
