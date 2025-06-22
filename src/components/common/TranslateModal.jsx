import { Loading } from '@/components/common/Loading';
import { ModalPortal } from '@/components/common/Modal';
import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';
import { formatPrice } from '@/utils/formatPrice';
export const TranslateModal = (props) => {
  return (
    <ModalPortal>
      <div className="modal-layout" onClick={props.onClickLeft}>
        <div
          className="flex w-full flex-col items-center gap-[1.875rem] rounded-[.625rem] bg-white px-10 py-[1.875rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="flex w-full justify-center text-bold-20 text-neutral-title">
            Preview
          </h1>
          {props.isLoading ? (
            <Loading />
          ) : (
            <div className="flex h-fit w-full flex-col gap-6">
              <div className="flex max-h-[50vh] flex-col gap-4">
                <div className="flex gap-4">
                  <div className="text-title-bold-16 text-neutral-80">
                    Title
                  </div>
                  <div className="flex w-full whitespace-break-spaces text-neutral-80">
                    {props.title}
                  </div>
                </div>
                {props?.price && (
                  <div className="flex gap-4">
                    <div className="text-title-bold-16 text-neutral-80">
                      Price
                    </div>
                    <div className="flex w-full whitespace-break-spaces text-neutral-80">
                      ₩ {formatPrice(props.price)}
                    </div>
                  </div>
                )}
                {props.categories.length !== 0 && (
                  <div className="flex gap-4">
                    <div className="text-title-bold-16 text-neutral-80">
                      Category
                    </div>
                    <div className="flex w-fit gap-1">
                      {props?.categories?.map((category, index) => (
                        <span key={category} className="flex flex-wrap gap-1">
                          {index !== 0 && <span>|</span>}
                          <span className="flex whitespace-break-spaces text-neutral-80">
                            {category}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full overflow-y-auto whitespace-break-spaces text-neutral-base scrollbar-hide">
                {props.text}
              </div>
            </div>
          )}
          <div className="flex w-full flex-row justify-center gap-4">
            <ButtonRound
              theme={BUTTON_THEMES.BORDER}
              size="modal"
              onClick={props.onClickLeft}
              text="Cancel"
            />
            <ButtonRound
              theme={
                props.isLoading ? BUTTON_THEMES.DISABLED : BUTTON_THEMES.PRIMARY
              }
              size="modal"
              onClick={props.onClickRight}
              text="Upload"
              disabled={props.isLoading}
            />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
