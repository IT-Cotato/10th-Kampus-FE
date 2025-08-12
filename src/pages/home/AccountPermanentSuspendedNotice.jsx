import ReportIcon from '@/assets/imgs/icon/report.svg?react';
import { BUTTON_THEMES, ButtonRound } from '@/components/common/ButtonRound';

export const AccountPermanentSuspendedNotice = () => {
  return (
    <div className="text-nuetral-base flex flex-col items-center justify-center gap-8 p-4 text-center text-base">
      <div className="flex flex-col items-center justify-center gap-6">
        <ReportIcon
          className="h-14 w-14 text-primary-red"
          aria-label="Report"
        />
        <p className="text-subTitle text-neutral-title">
          You can no longer use Kampus
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <p>
          At Kampus, we are committed to maintaining a safe and respectful
          community for all users. After reviewing your activity, we have
          determined that it violates our
          <span className="text-primary-red"> Community Guidelines</span> and
          <span className="text-primary-red"> Terms of Service</span>. As a
          result, we are permanently restricting your access to Kampus services.
        </p>
        <p className="text-left">
          Due to this decision:
          <li>
            You can no longer post, comment, or interact within the Kampus
            community.
          </li>
          <li>
            Any previously posted content remains subject to review and may be
            removed if it violates our policies.
          </li>
          <li>
            You cannot create a new account using the same personal information
            or device.
          </li>
          <li>
            You may still log in to review your account details, but access to
            all community features is restricted.
          </li>
        </p>
        <p>
          If you believe this decision was made in error, please contact our
          support team through the official
          <span className="text-primary-red"> Contact Kampus</span> for further
          assistance.
        </p>
      </div>
      <ButtonRound theme={BUTTON_THEMES.REJECTED} text={'Contact Kampus'} />
    </div>
  );
};
