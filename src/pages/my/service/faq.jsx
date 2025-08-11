import { FAQItem } from '@/components/service/faq/faqItem';
import FAQS from '@/constants/faqs';

export const FAQ = () => {
  return (
    <div className="flex w-full flex-col gap-[1.875rem]">
      {FAQS.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};
