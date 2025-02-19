'use client';

import React, { useCallback, useEffect, useRef } from 'react';

import KeyboardHousing from '@/components/KeyboardLayout/KeyboardHousing';
import Keycap from '@/components/KeyboardLayout/Keycap';
import {
  calculateKeyboardHousingDimensions,
  getBasicKeyToByte,
  getPosition,
  keyColorPalette,
} from '@/components/KeyboardLayout/KeyGroup/KeyGroup.utils';

import useGetSize from '@/hooks/useGetSize';

import { bindClassNames } from '@/libs/BindClassName.ts';

import { matrixKeycodes } from '@/utils/keyboards/key-event';
import { getKeycapSharedProps, getKeysKeys, getLabels } from '@/utils/keyboards/key-group';
import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';
import { DisplayMode, KeyRowCol, KeysKeys } from '@/utils/keyboards/types/keyboard-rendering';
import { KeyboardDefinition } from '@/utils/keyboards/types/types';

import styles from './KeyGroup.module.css';

const cx = bindClassNames(styles);

type Props = {
  definition: KeyboardDefinition;
  selectedOptionKeys: number[];
  parentElWidth?: string;
  innerPadding?: number;
  handleClickKeycap?: (keyRowCol: { row: number; col: number }) => void;
  clickedKeys?: KeyRowCol[];
  isRedraw?: boolean;
};

export default function KeyGroup({
  definition,
  selectedOptionKeys,
  parentElWidth = '100vw',
  innerPadding = 35,
  handleClickKeycap,
  clickedKeys,
  isRedraw = false,
}: Props) {
  const { keys, optionKeys } = definition.layouts;
  // 옵션 키 설정 (슷바 쪼개기 등)
  const displayedOptionKeys = optionKeys
    ? Object.entries(optionKeys).flatMap(([key, options]) => {
        const optionKey = parseInt(key, 10);
        return selectedOptionKeys[optionKey] ? options[selectedOptionKeys[optionKey]] : options[0];
      })
    : [];
  const displayedKeys = [...keys, ...displayedOptionKeys]; // 실제 Display 되는 키
  const { width: keyboardHousingWidth, height: keyboardHousingHeigth } = calculateKeyboardHousingDimensions(displayedKeys);
  const props = { definition, keys: displayedKeys, matrixKeycodes, mode: DisplayMode.Test };
  const keysKeys: KeysKeys<React.MouseEvent> = getKeysKeys(props, keyColorPalette, getPosition);
  const { basicKeyToByte, byteToKey } = getBasicKeyToByte();
  const labels = getLabels(props, [], basicKeyToByte, byteToKey);

  // 부모의 width를 기준으로 키보드 레이아웃 width, height를 조정한다.
  const routeX = -200;
  const outerAreaRef = useRef<HTMLDivElement>(null);
  const animation = {
    transition: 'transform 0.25s ease-in-out',
    transform: `translate(${routeX}vw, 0px)`,
  };

  const addTransition = useCallback(() => {
    if (outerAreaRef.current) {
      outerAreaRef.current.style.transition = animation.transition;
    }
  }, [outerAreaRef.current]);

  const removeTransition = useCallback(() => {
    if (outerAreaRef.current) {
      outerAreaRef.current.style.transition = '';
    }
  }, [outerAreaRef.current]);

  useEffect(() => {
    if (outerAreaRef.current) {
      outerAreaRef.current.addEventListener('transitionend', removeTransition);
      outerAreaRef.current.style.transform = animation.transform;
    }
    return () => {
      if (outerAreaRef.current) {
        outerAreaRef.current?.removeEventListener('transitionend', removeTransition);
      }
    };
  }, [outerAreaRef]);

  useEffect(() => {
    if (outerAreaRef.current && outerAreaRef.current.style.transform !== animation.transform) {
      addTransition();
      outerAreaRef.current.style.transform = animation.transform;
    }
  }, [routeX]);

  const rootRef = useRef<HTMLDivElement>(null);
  const containerDimensions = useGetSize(rootRef);

  const containerWidth = containerDimensions?.width || 0;
  const containerHeight = containerDimensions?.height || 0;
  const ratio =
    Math.min(
      Math.min(
        1,
        (containerDimensions &&
          containerWidth /
            ((CSSVarObject.keyWidth + CSSVarObject.keyXSpacing) * keyboardHousingWidth -
              CSSVarObject.keyXSpacing +
              innerPadding)) ||
          0,
      ),
      containerHeight /
        ((CSSVarObject.keyHeight + CSSVarObject.keyYSpacing) * keyboardHousingHeigth - CSSVarObject.keyYSpacing + innerPadding),
    ) || 1;

  return (
    <div className={cx('root')} ref={rootRef}>
      <div className={cx('innerBlock')} ref={outerAreaRef}>
        <div className={cx('variableWidthBlock')} style={{ width: parentElWidth }}>
          <div
            className={cx('variableScaleBlock')}
            style={{
              transform: `scale(${ratio}, ${ratio})`,
            }}
          >
            <div>
              <KeyboardHousing width={keyboardHousingWidth} height={keyboardHousingHeigth} />
              <div className={cx('keycapBlock')}>
                {displayedKeys.map((k, i) => {
                  const { textureWidth, textureHeight, position, rotation } = getKeycapSharedProps(
                    k,
                    i,
                    props,
                    keysKeys,
                    labels,
                    true,
                  );
                  return k.d ? null : (
                    <Keycap
                      key={`${k.row},${k.col}`}
                      textureWidth={textureWidth}
                      textureHeight={textureHeight}
                      position={position}
                      rotation={rotation}
                      keyRow={k.row}
                      keyCol={k.col}
                      registeredSwitch={k.registeredSwitch}
                      registeredKeycap={k.registeredKeycap}
                      handleClickKeycap={handleClickKeycap}
                      isClicked={
                        clickedKeys?.find((clickedKey) => clickedKey.row === k.row && clickedKey.col === k.col) !== undefined
                      }
                      isRedraw={isRedraw}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
