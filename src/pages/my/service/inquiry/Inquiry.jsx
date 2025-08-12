import { getInquiryList } from '@/apis/mypage/getInquiryList.api';
import { Loading } from '@/components/common/Loading';
import { InquiryButton } from '@/components/service/inquiry/InquiryButton';
import { InquiryItem } from '@/components/service/inquiry/InquiryItem';
import { QUERY_KEYS } from '@/constants/api';
import { useQuery } from '@tanstack/react-query';

export const Inquiry = () => {
  const { data: inquiryList, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.GET_INQUIRY],
    queryFn: () => getInquiryList(),
  });

  return (
    <div className="flex h-full w-full flex-col">
      {isLoading ? (
        <Loading />
      ) : !inquiryList ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-[.625rem]">
          <span>There is no history of inquiry.</span>
          <InquiryButton />
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex justify-center pb-7 pt-5">
            <InquiryButton />
          </div>
          {inquiryList.inquiryPreviews.map((item, index) => (
            <InquiryItem
              key={index}
              title={item.title}
              date={item.createdTime}
              pending={item.status}
              inquiryId={item.inquiryId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
