import { Result, getBoundingBox } from '@the-via/reader';

import { getByteToKey } from '@/utils/keyboards/key';
import { getBasicKeyDict } from '@/utils/keyboards/key-to-byte/dictionary-store';
import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';

export const keyColorPalette = {
  alpha: {
    c: '#363434',
    t: '#E8C4B8',
  },
  mod: {
    c: '#363434',
    t: '#E8C4B8',
  },
  accent: {
    c: '#E8C4B8',
    t: '#363434',
  },
};

export const getPosition = (x: number, y: number): [number, number, number] => [
  x - CSSVarObject.keyWidth / 2,
  y - CSSVarObject.keyHeight / 2,
  0,
];

export const calculateKeyboardHousingDimensions = (keys: Partial<Result>[]) => {
  const boundingBoxes = keys.map(getBoundingBox as any) as any[];
  const minX = Math.min(...boundingBoxes.map((b) => b.xStart));
  const minY = Math.min(...boundingBoxes.map((b) => b.yStart));
  const width = Math.max(...boundingBoxes.map((b) => b.xEnd)) - minX;
  const height = Math.max(...boundingBoxes.map((b) => b.yEnd)) - minY;
  return {
    width,
    height,
  };
};

export const getBasicKeyToByte = (connectedDevice?: any) => {
  const basicKeyToByte = getBasicKeyDict(connectedDevice ? connectedDevice.protocol : 0);
  return { basicKeyToByte, byteToKey: getByteToKey(basicKeyToByte) };
};
