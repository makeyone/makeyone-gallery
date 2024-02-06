'use client';

import { useCallback, useEffect, useRef } from 'react';

import { paintKeycap } from '@/components/KeyboardLayout/Keycap/Keycap.utils';

import { bindClassNames } from '@/libs/bind-class-name';

import { getDarkenedColor } from '@/utils/keyboards/color-math';
import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';
import { TwoStringKeycapProps } from '@/utils/keyboards/types/keyboard-rendering';

import styles from './Keycap.module.css';

const cx = bindClassNames(styles);

type Props = TwoStringKeycapProps;

export default function Keycap({
  label,
  scale,
  color,
  disabled,
  shouldRotate,
  textureWidth,
  textureHeight,
  skipFontCheck,
  position,
  rotation,
}: Props) {
  const keycapZ = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const redraw = useCallback(() => {
    if (canvasRef.current && color && label && (document.fonts.check('bold 16px "Fira Sans"', label.label) || skipFontCheck)) {
      paintKeycap(canvasRef.current, textureWidth, textureHeight, color.t, label);
    }
  }, [canvasRef.current, textureWidth, label && label.key, scale[0], scale[1], color && color.t, color && color.c, shouldRotate]);

  useEffect(redraw, [label && label.key, skipFontCheck, color && color.c, color && color.t]);
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
        cursor: !disabled ? 'pointer' : 'initial',
      }}
      // onClick={() => console.log(label)}
    >
      <div
        className={cx('glowBlock')}
        style={{
          background: getDarkenedColor(color.c, 0.8),
          transform: `perspective(100px) translateZ(${keycapZ}px)`,
          width: textureWidth * CSSVarObject.keyXPos - CSSVarObject.keyXSpacing,
          height: textureHeight * CSSVarObject.keyYPos - CSSVarObject.keyYSpacing,
        }}
      >
        <div
          className={cx('canvasBlock')}
          style={{
            background: color.c,
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}
