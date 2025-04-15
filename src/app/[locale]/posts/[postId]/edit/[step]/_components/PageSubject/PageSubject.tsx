'use client';

import { useParams } from 'next/navigation';

import { FaLocationArrow } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import snakecase from 'snakecase';

import { EditPostStep } from '@/app/[locale]/posts/[postId]/edit/[step]/_constants/step';

import useClientI18n from '@/hooks/useClientI18n';

import { bindClassNames } from '@/libs/BindClassName';

import styles from './PageSubject.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function PageSubject({}: Props) {
  const t = useClientI18n('edit-post');

  const params = useParams();
  const currentStep = params.step as EditPostStep;

  return (
    <div className={cx('root')}>
      <h1 className={cx('title')}>{t('page_subject')}</h1>
      <h2 className={cx('breadCrumbs')}>
        <i className={cx('breadCrumbsIcon')}>
          <FaLocationArrow />
        </i>
        {t('bread_crumbs_main_step')}
        <i className={cx('arrowIcon')}>
          <IoIosArrowForward />
        </i>
        {t('bread_crumbs_main_sub_step')}
        <i className={cx('arrowIcon')}>
          <IoIosArrowForward />
        </i>
        {t(`step_${snakecase(currentStep)}`)}
      </h2>
    </div>
  );
}
