import React, { CSSProperties, useEffect, useRef } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoMdClose } from 'react-icons/io';

import BlurPlaceholderImage from '@/components/Image/BlurPlaceholderImage';

import { bindClassNames } from '@/libs/bind-class-name';

import styles from './DragAndDropImgItem.module.css';

const cx = bindClassNames(styles);

type Props = {
  uploadedImageUrl: string;
  onDeleteImage: (uploadedImageUrl: string) => void;
  isRepresentImage?: boolean;
  isDragActiveComponent?: boolean;
  imageWidth?: number;
  setImageWidth?: React.Dispatch<React.SetStateAction<number>>;
};

// TODO: @dnd-kit 확인 후 괜찮은 방법 찾아서 리팩토링 해야함
// 드래그 시점에 활성화되는 Active 컴포넌트와 동일한 해당 컴포넌트를 사용해서 width를 가져올 때의 이슈가 있음.
// 현재는 imageWidth를 드래그를 하지 않을 때 기록을 해두고 기록된 width를 드래그를 시작할 때 활성화된 이 컴포넌트에서 사용한다.
export default function DragAndDropImgItem({
  uploadedImageUrl,
  onDeleteImage,
  isRepresentImage = false,
  isDragActiveComponent = false,
  imageWidth,
  setImageWidth,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: uploadedImageUrl });
  const rootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (rootRef.current && setImageWidth) {
      setImageWidth(rootRef.current.clientWidth);
    }
  }, []);

  const dragActiveComponentStyles: CSSProperties = {
    width: `${imageWidth}px`,
    transform: 'scale(1.05)',
    boxShadow: 'rgb(63 63 68 / 5%) 0px 2px 0px 2px',
    opacity: '0.9',
  };

  return (
    <div
      className={cx('root')}
      key={uploadedImageUrl}
      ref={rootRef}
      style={isDragActiveComponent ? dragActiveComponentStyles : {}}
    >
      <div
        className={cx('sortArea')}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          transform: CSS.Transform.toString(transform),
          transition: transition || undefined,
        }}
      >
        <BlurPlaceholderImage
          className={cx('image')}
          src={uploadedImageUrl}
          alt={uploadedImageUrl}
          width={rootRef.current?.clientWidth || 0}
          height={rootRef.current?.clientWidth || 0}
          sizes="100vw"
        />
        <button type="button" className={cx('deleteImageBtn')} onClick={() => onDeleteImage(uploadedImageUrl)}>
          <IoMdClose />
        </button>
        {isRepresentImage === true && <div className={cx('representBadge')}>대표이미지</div>}
      </div>
    </div>
  );
}
