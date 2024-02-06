'use client';

import { VIADefinitionV2 } from '@the-via/reader';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';

import { bindClassNames } from '@/libs/bind-class-name';

import fullKeyboardDefinition from '@/utils/keyboards/test-keyboard-definition.json';

import styles from './TestFullKey.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function TestFullKey({}: Props) {
  return (
    <div className={cx('root')}>
      <div style={{ position: 'relative' }}>
        <div>Test Full Key</div>
        <KeyGroup definition={fullKeyboardDefinition as VIADefinitionV2} />
      </div>
    </div>
  );
}
