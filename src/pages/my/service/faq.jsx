import { FAQItem } from '@/components/service/faq/faqItem';
import { faqs } from '@/constants/faqs';

export const FAQ = () => {
  const FAQ = [...faqs];

  return (
    <div className="flex flex-col w-full gap-[1.875rem]">
      {FAQ.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};
