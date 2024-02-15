'use client';

import KeyGroup from '@/components/KeyboardLayout/KeyGroup';

import useImportKeyboardDefinition from '@/hooks/useImportKeyboardDefinition';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './SelectKeyboardLayout.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function SelectKeyboardLayout({}: Props) {
  const [loadedDefinition, handleChangeDefinition] = useImportKeyboardDefinition();

  return (
    <div className={cx('root')}>
      <div style={{ position: 'relative', top: '450px' }}>
        <div>Select Keyboard Layout</div>
        <input type="file" accept=".json" onChange={handleChangeDefinition} multiple={false} />
        {loadedDefinition && <KeyGroup definition={loadedDefinition} selectedOptionKeys={[]} />}
        {/* [2, 1, 2, 1] */}
      </div>
    </div>
  );
}
