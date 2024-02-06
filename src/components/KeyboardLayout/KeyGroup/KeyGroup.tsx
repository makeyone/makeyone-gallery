'use client';

import React from 'react';

import { VIADefinitionV2, VIADefinitionV3, VIAKey } from '@the-via/reader';

import IsOnMount from '@/components/IsOnMount';
import KeyboardHousing from '@/components/KeyboardLayout/KeyboardHousing';
import Keycap from '@/components/KeyboardLayout/Keycap';
import {
  calculateKeyboardHousingDimensions,
  getBasicKeyToByte,
  getPosition,
  keyColorPalette,
} from '@/components/KeyboardLayout/KeyGroup/KeyGroup.utils';

import { bindClassNames } from '@/libs/bind-class-name';

import { matrixKeycodes } from '@/utils/keyboards/key-event';
import { getKeycapSharedProps, getKeysKeys, getLabels } from '@/utils/keyboards/key-group';
import fullKeyboardDefinition from '@/utils/keyboards/test-keyboard-definition.json';
import { DisplayMode, KeysKeys } from '@/utils/keyboards/types/keyboard-rendering';

import styles from './KeyGroup.module.css';

const cx = bindClassNames(styles);

type Props = {};

export default function KeyGroup({}: Props) {
  const definition = fullKeyboardDefinition as VIADefinitionV2 | VIADefinitionV3;
  const keys = fullKeyboardDefinition.layouts.keys as VIAKey[];
  // const keyCodes = matrixKeycodes;
  const { width: keyboardHousingWidth, height: keyboardHousingHeigth } = calculateKeyboardHousingDimensions(keys);
  const props = { definition, keys, matrixKeycodes, mode: DisplayMode.Test };
  const keysKeys: KeysKeys<React.MouseEvent> = getKeysKeys(props, keyColorPalette, getPosition);
  const { basicKeyToByte, byteToKey } = getBasicKeyToByte();
  const labels = getLabels(props, [], basicKeyToByte, byteToKey);

  return (
    <IsOnMount>
      <div className={cx('root')}>
        <div className={cx('innerBlock')}>
          <KeyboardHousing width={keyboardHousingWidth} height={keyboardHousingHeigth} />
          <div className={cx('keycapBlock')}>
            {keys.map((k, i) => {
              return k.d ? null : (
                <Keycap key={k.col} {...getKeycapSharedProps(k, i, props, keysKeys, labels, true)} clipPath={null} />
              );
            })}
          </div>
        </div>
      </div>
    </IsOnMount>
  );
}