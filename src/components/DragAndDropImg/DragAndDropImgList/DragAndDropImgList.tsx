'use client';

import React, { useState } from 'react';

import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import DragAndDropImgItem from '@/components/DragAndDropImg/DragAndDropImgItem';

import useDndKit from '@/hooks/useDndKit';

import { bindClassNames } from '@/libs/BindClassName.ts';

import styles from './DragAndDropImgList.module.css';

const cx = bindClassNames(styles);

type Props = {
  imagesUrl: string[];
  setImagesUrl: React.Dispatch<React.SetStateAction<string[]>>;
  onDeleteImage: (imageUrl: string) => void;
};

export default function DragAndDropImgList({ imagesUrl, setImagesUrl, onDeleteImage }: Props) {
  const { activeId, sensors, handleDragStart, handleDragEnd, handleDragCancel } = useDndKit({ setItems: setImagesUrl });
  const [imageWidth, setImageWidth] = useState<number>(0);

  return (
    <div className={cx('root')}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={imagesUrl} strategy={rectSortingStrategy}>
          {imagesUrl.map((imageUrl) => (
            <DragAndDropImgItem
              key={imageUrl}
              isRepresentImage={imageUrl === imagesUrl[0]}
              uploadedImageUrl={imageUrl}
              onDeleteImage={onDeleteImage}
              setImageWidth={setImageWidth}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId && (
            <DragAndDropImgItem
              key={activeId}
              isDragActiveComponent
              uploadedImageUrl={activeId}
              imageWidth={imageWidth}
              onDeleteImage={onDeleteImage}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
