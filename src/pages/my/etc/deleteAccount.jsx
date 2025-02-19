import { Report } from '@/components/common/Report';
export const DeleteAccount = () => {
  const headerTitle = "Delete Account";
  const pageTitle = "Why are you leaving Kampus?";
  const contentTitle = "We’re sorry to see you go! We’d love to know why you want to delete your account, so we can improve the app and support our community.";
  const reasons = [
    { id: 0, text: 'Studying abroad in Korea is over' },
    { id: 1, text: 'Too much advertising' },
    { id: 2, text: 'Too many errors' },
    { id: 3, text: 'Hard to use' },
    { id: 4, text: 'Other' },
  ];
  const radioPlaceHolder = "Please let us know why you're leaving Kampus. Your feedback helps us improve.";
  const handleSubmit = () => { };
  const popupTitle = "Are you sure you're leaving Kampus?";
  const popupText = "When you delete your account, all personal information and your articles will be deleted.";
  const popupLeftText = "Leave now";
  const popupRightText = "I don't want to leave";
  const ButtonText = "Delete Account";

  return (
    <Report
      headerTitle={headerTitle}
      pageTitle={pageTitle}
      contentTitle={contentTitle}
      reasons={reasons}
      radioPlaceHolder={radioPlaceHolder}
      handleSubmit={handleSubmit}
      popupTitle={popupTitle}
      popupText={popupText}
      popupLeftText={popupLeftText}
      popupRightText={popupRightText}
      ButtonText={ButtonText}
    />
  );
};
