import { useEffect } from 'react';
import { Loading } from '@/components/common/Loading';
import { cn } from '@/utils/cn';
export const TranslatePopup = (props) => {
    useEffect(() => {
        // 스크롤 막기
        document.body.style.overflow = 'hidden';

        return () => {
            // 컴포넌트가 언마운트될 때 원래 상태로 복구
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="max-w-lg mx-auto py-4 min-h-dvh w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(11,11,11,0.6)] fixed flex z-[100] justify-center items-center align-middle">
            <dialog className="relative z-[200] w-full flex flex-col items-center justify-center bg-white border py-[1.875rem] gap-[1.875rem] mx-4 px-4 rounded-[.625rem]">
                <div className='flex w-full justify-center text-neutral-base text-subTitle'>
                    Preview
                </div>
                {props.isLoading ?
                    <Loading />
                    :
                    <div className='w-full h-full flex flex-col gap-[1.875rem]'>

                        <div className="flex w-full items-center whitespace-pre-line align-middle text-pageTitle">
                            {props.title}
                        </div>
                        <div className="flex w-full items-center whitespace-pre-line align-middle text-subTitle">
                            {props.text}
                        </div>
                    </div>
                }
                <div className="flex w-full justify-center flex-row gap-4">
                    <button
                        type="submit"
                        onClick={props.onClickLeft}
                        className="min-w-[7.625rem] rounded-[1.875rem] border border-neutral-border-40 px-[1.375rem] py-[.625rem] text-base"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={props.onClickRight}
                        className={cn("min-w-[7.625rem] rounded-[1.875rem] bg-primary-base px-[1.375rem] py-[.625rem] text-base text-white",
                            { "bg-neutral-disabled": props.isLoading })}

                        disabled={props.isLoading}
                    >
                        Upload
                    </button>
                </div>
            </dialog >
        </div >
    );
};
