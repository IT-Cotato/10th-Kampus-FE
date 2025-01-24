import arrow from '@/assets/imgs/arrowLine.svg';
import { InquiryButton } from '@/components/service/inquiry/inquiryButton';

export const InquiryEmpty = () => {
  return (
    <div className="gap-2.5">
      <span>There is no history of inquiry.</span>
      <InquiryButton />
    </div>
  );
};
