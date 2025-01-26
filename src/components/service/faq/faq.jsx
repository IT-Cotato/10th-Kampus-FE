import { FAQItem } from '@/components/service/faq/faqItem';

export const FAQ = () => {
  const faqs = [
    {
      question: 'Where can I change user name?',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Nisi id placerat tortor orci quis volutpat. Diam adipiscing tempor a lacinia mattis vel ut. Suspendisse mauris at in eget lectus aliquam eget adipiscing nunc. Venenatis dui nibh porta elit tellus dignissim nisl.',
    },
    {
      question: 'Where can I change user name?',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Nisi id placerat tortor orci quis volutpat. Diam adipiscing tempor a lacinia mattis vel ut. Suspendisse mauris at in eget lectus aliquam eget adipiscing nunc. Venenatis dui nibh porta elit tellus dignissim nisl.',
    },
    {
      question: 'Where can I change user name?',
      answer:
        'Lorem ipsum dolor sit amet consectetur. Nisi id placerat tortor orci quis volutpat. Diam adipiscing tempor a lacinia mattis vel ut. Suspendisse mauris at in eget lectus aliquam eget adipiscing nunc. Venenatis dui nibh porta elit tellus dignissim nisl.',
    },
  ];
  return (
    <div className="mx-4">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};
