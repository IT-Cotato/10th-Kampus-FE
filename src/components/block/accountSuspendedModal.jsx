import { Modal, MODAL_TYPES } from '@/components/common/Modal';
import lockIcon from '@/assets/imgs/lock.svg';
import unlockIcon from '@/assets/imgs/unlock.svg';
import checkIcon from '@/assets/imgs/check.svg?react';
import OfficialMail from '@/constants/OfficialMail.json';

export const AccountTemporarilySuspendedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal
      type={MODAL_TYPES.REJECTED}
      title="Your Kampus account is suspended"
      titleIcon={lockIcon}
      onClose={onClose}
      onClickRight={onClose}
    >
      Your Kampus account has been suspended. This means that you can no longer
      enter Kampus. Please use{' '}
      <a
        aria-label="Contact Kampus button"
        className="text-primary-red"
        href={`mailto:${OfficialMail.mail}`}
      >
        Contact Kampus
      </a>{' '}
      for more information.
    </Modal>
  );
};

import React from 'react';

export const AccountActiveModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal
      type={MODAL_TYPES.REJECTED}
      title="Your Kampus account suspension is lifted"
      titleIcon={unlockIcon}
      onClose={onClose}
      onClickRight={onClose}
    >
      <p>
        Good news! Your Kampus account suspension has been lifted. You can now
        access Kampus and use all its features as usual.
        <br />
        Please ensure that your future activity complies with our
        <span className="text-primary-blue"> Community Guidelines</span> and
        <span className="text-primary-blue"> Terms of Service</span> to avoid
        any further restrictions.
        <br />
        If you have any questions or need assistance, feel free to reach out
        through Contact Kampus.
        <br />
        Welcome back!
      </p>
      <div className="flex">
        <img src={checkIcon} alt="check" className="text-primary-blue" />
        <p>I will not violate the guidelines again.</p>
      </div>
    </Modal>
  );
};
