/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useCallback, useEffect, useRef } from 'react';

import { paintKeycap } from '@/components/KeyboardLayout/Keycap/Keycap.utils';

import { bindClassNames } from '@/libs/bind-class-name';

import { getDarkenedColor } from '@/utils/keyboards/color-math';
import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';
import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

import styles from './Keycap.module.css';

const cx = bindClassNames(styles);

type Props = {
  keyRow: number;
  keyCol: number;
  isClicked: boolean;
  textureWidth: number;
  textureHeight: number;
  position: [number, number, number];
  rotation: [number, number, number];
  handleClickKeycap?: (keyRowCol: KeyRowCol) => void;
  registeredSwitch?: {
    id: number;
    switchName: string;
  };
  registeredKeycap?: {
    id: number;
    keycapName: string;
  };
  isRedraw: boolean;
};

export default function Keycap({
  keyRow,
  keyCol,
  textureWidth,
  textureHeight,
  position,
  rotation,
  handleClickKeycap,
  isClicked,
  registeredSwitch,
  registeredKeycap,
  isRedraw,
}: Props) {
  const keycapZ = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      paintKeycap({
        canvas: canvasRef.current,
        textureWidth,
        textureHeight,
        keyRow,
        keyCol,
        registeredSwitch,
        registeredKeycap,
      });
    }
  }, [canvasRef.current, textureWidth, registeredSwitch, registeredKeycap]);

  useEffect(redraw, []);
  useEffect(() => {
    if (isRedraw === true) {
      redraw();
    }
  }, [isRedraw]);
  useEffect(() => {
    document.fonts.addEventListener('loadingdone', redraw);
    return () => {
      document.fonts.removeEventListener('loadingdone', redraw);
    };
  }, []);

  return (
    <div
      className={cx('root')}
      style={{
        transform: `translate(${
          CSSVarObject.keyWidth / 2 + position[0] - (CSSVarObject.keyXPos * textureWidth - CSSVarObject.keyXSpacing) / 2
        }px,${
          CSSVarObject.keyHeight / 2 + position[1] - (CSSVarObject.keyYPos * textureHeight - CSSVarObject.keyYSpacing) / 2
        }px) rotate(${-rotation[2]}rad)`,
        width: textureWidth * CSSVarObject.keyXPos - CSSVarObject.keyXSpacing,
        height: textureHeight * CSSVarObject.keyYPos - CSSVarObject.keyYSpacing,
      }}
      onClick={handleClickKeycap ? () => handleClickKeycap({ row: keyRow, col: keyCol }) : () => {}}
    >
      <div
        className={cx('glowBlock')}
        style={{
          background: isClicked ? getDarkenedColor('#ff6060', 0.8) : getDarkenedColor('#363434', 0.8),
          transform: `perspective(100px) translateZ(${keycapZ}px)`,
          width: textureWidth * CSSVarObject.keyXPos - CSSVarObject.keyXSpacing,
          height: textureHeight * CSSVarObject.keyYPos - CSSVarObject.keyYSpacing,
        }}
      >
        <div
          className={cx('canvasBlock')}
          style={{
            background: isClicked ? '#ff6060' : '#363434',
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
