'use client';

import { CiCircleCheck } from 'react-icons/ci';
import { PiWarningCircle } from 'react-icons/pi';
import { TbExternalLink } from 'react-icons/tb';
import { VscError } from 'react-icons/vsc';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import { Link } from '@/i18n/routing';

import styles from './PostStepStatusItem.module.css';

const cx = bindClassNames(styles);

type Props = {
  stepLink: string;
  stepTitle: string;
  isRequiredStep: boolean;
  isWrote: boolean;
};

export default function PostStepStatusItem({ stepLink, stepTitle, isRequiredStep, isWrote }: Props) {
  const t = useClientI18n('edit-post');

  return (
    <li className={cx('item')}>
      <span className={cx('title')}>{stepTitle}</span>
      <div className={cx('content')}>
        {isWrote === true && (
          <div className={cx('success')}>
            <CiCircleCheck className={cx('icon', 'success')} />
            {t('edit_post_setting_status_success')}
          </div>
        )}
        {isRequiredStep === true && isWrote === false && (
          <div className={cx('error')}>
            <VscError className={cx('icon', 'error')} />
            {t('edit_post_setting_status_blank')}
          </div>
        )}
        {isRequiredStep === false && isWrote === false && (
          <div className={cx('warning')}>
            <PiWarningCircle className={cx('icon', 'warning')} />
            {t('edit_post_setting_status_optional')}
          </div>
        )}
      </div>
      <Link className={cx('link')} href={stepLink}>
        {t('edit_post_setting_go_to_step')}
        <TbExternalLink className={cx('icon')} />
      </Link>
    </li>
  );
}
