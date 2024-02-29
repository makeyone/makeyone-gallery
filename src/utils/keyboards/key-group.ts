import { getBoundingBox, Result, VIAKey } from '@the-via/reader';

import { getByteToKey } from '@/utils/keyboards/key';
import { getBasicKeyDict } from '@/utils/keyboards/key-to-byte/dictionary-store';
import {
  calculatePointPosition,
  getKeyboardRowPartitions,
  getKeyId,
  getLabel,
  getMeshName,
  getScale,
  KeycapMetric,
} from '@/utils/keyboards/keyboard-rendering';
import { KeyGroupProps, KeycapSharedProps, KeysKeys } from '@/utils/keyboards/types/keyboard-rendering';

export function getKeycapSharedProps<T>(
  k: VIAKey,
  i: number,
  props: KeyGroupProps<T>,
  keysKeys: KeysKeys<T>,
  labels: any[],
  skipFontCheck: boolean,
): KeycapSharedProps<T> {
  const { position, rotation, scale, idx, onClick, onPointerDown, onPointerOver } = keysKeys.coords[i];
  const isEncoder = k.ei !== undefined;
  return {
    mode: props.mode,
    position,
    rotation,
    scale: getScale(k, scale),
    textureWidth: k.w,
    textureHeight: k.h,
    textureOffsetX: k.w2 ? Math.abs(k.w2 - k.w) : 0,
    shouldRotate: isEncoder,
    onPointerDown,
    onPointerOver,
    keyState: props.pressedKeys ? props.pressedKeys[i] : -1,
    disabled: !props.selectable,
    selected: false,
    idx,
    label: labels[i],
    onClick,
    skipFontCheck,
  };
}

const getKeysKeysIndices = (vendorProductId: number) => (k: VIAKey, i: number) => {
  const isEncoder = k.ei !== undefined;
  return `${vendorProductId}-${i}-${k.w}-${k.h}-${isEncoder}`;
};

export function getLabels<T>(
  props: KeyGroupProps<T>,
  macroExpressions: string[],
  basicKeyToByte: ReturnType<typeof getBasicKeyDict>,
  byteToKey: ReturnType<typeof getByteToKey>,
) {
  return !props.matrixKeycodes.length
    ? []
    : props.keys.map((k, i) =>
        getLabel(props.matrixKeycodes[i], k.w, macroExpressions, props.definition, basicKeyToByte, byteToKey),
      );
}

export function getKeysKeys<T>(
  props: KeyGroupProps<T>,
  keyColorPalette: any,
  getPosition: (x: number, y: number) => [number, number, number],
): KeysKeys<T> {
  const { keys } = props;
  const { rowMap } = getKeyboardRowPartitions(keys);
  const boxes = (keys as unknown as Result[]).map(getBoundingBox);
  const [minX, minY] = [Math.min(...boxes.map((p) => p.xStart)), Math.min(...boxes.map((p) => p.yStart))];
  const positions = keys
    .map((k) => {
      const key = { ...k };
      if (minX < 0) {
        key.x -= minX;
      }
      if (minY < 0) {
        key.y -= minY;
      }
      return key;
    })
    .map(calculatePointPosition);
  return {
    indices: keys.map(getKeysKeysIndices(props.definition.vendorProductId)),
    coords: keys.map((k, i) => {
      // x & y are pixel positioned
      const [x, y] = positions[i];
      const r = (k.r * (2 * Math.PI)) / 360;
      // The 1.05mm in-between keycaps but normalized by a keycap width/height
      const normalizedKeyXSpacing = KeycapMetric.keyXSpacing / KeycapMetric.keyWidth;
      const normalizedKeyYSpacing = KeycapMetric.keyYSpacing / KeycapMetric.keyHeight;
      const normalizedWidth = (1 + normalizedKeyXSpacing) * (k.w2 || k.w) - normalizedKeyXSpacing;
      const normalizedHeight = k.h * (1 + normalizedKeyYSpacing) - normalizedKeyYSpacing;
      const meshKey = getMeshName(k, rowMap[getKeyId(k)], false);
      const paletteKey = props.keyColors ? i : k.color;
      const color = (keyColorPalette as any)[paletteKey];

      return {
        position: getPosition(x + minX, y + minY),
        rotation: [0, 0, -r],
        scale: [normalizedWidth, normalizedHeight, 1],
        color,
        meshKey,
        idx: i,
        onClick: (evt: any) => {
          evt.stopPropagation();
        },
        onPointerDown: props.onKeycapPointerDown,
        onPointerOver: props.onKeycapPointerOver,
      };
    }),
  };
}
