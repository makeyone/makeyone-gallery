'use client';

import Image from 'next/image';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './BlurPlaceholderImage.module.css';

const cx = bindClassNames(styles);

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

export default function BlurPlaceholderImage({ src, alt, width, height, sizes, className = '' }: Props) {
  return (
    <Image
      className={cx(className)}
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      width={width}
      height={height}
      sizes={sizes}
    />
  );
}
