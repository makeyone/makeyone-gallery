'use client';

import { bindClassNames } from '@/libs/bind-class-name';

import { getDarkenedColor } from '@/utils/keyboards/color-math';
import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';

import styles from './KeyboardHousing.module.css';

const cx = bindClassNames(styles);

type Props = {
  width: number;
  height: number;
};

export default function KeyboardHousing({ width, height }: Props) {
  const properWidth = width * CSSVarObject.keyXPos - CSSVarObject.keyXSpacing;
  const properHeight = CSSVarObject.keyYPos * height - CSSVarObject.keyYSpacing;
  const { insideBorder } = CSSVarObject;
  const insideWidth = properWidth + insideBorder * 1;
  const outsideWidth = properWidth + insideBorder * 3;
  const [insideHeight, outsideHeight] = [properHeight + insideBorder, properHeight + insideBorder * 3];
  const [stp1, stp2, stp3] = [0.15, 0.25, 0.2].map((num) => getDarkenedColor('#E8C4B8', num));

  return (
    <div className={cx('root')}>
      <div
        className={cx('outerCase')}
        style={{
          width: outsideWidth,
          height: outsideHeight,
        }}
      />
      <div
        className={cx('innerCase')}
        style={{
          background: `linear-gradient(200deg,${stp1} 40%,${stp2},${stp3} 80%)`,
          width: insideWidth,
          height: insideHeight,
          transform: `translate( ${insideWidth - properWidth}px, ${insideHeight - properHeight}px)`,
        }}
      />
    </div>
  );
}
