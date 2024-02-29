/* eslint-disable no-param-reassign */

import { CSSVarObject } from '@/utils/keyboards/keyboard-rendering';

const paintDebugLines = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  if (context == null) {
    return;
  }
  context.strokeStyle = 'magenta';
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.lineTo(0, 0);
  context.stroke();
};

const paintKeycapLabel = (canvas: HTMLCanvasElement, legendColor: string, label: any, keyRowCol: string, isClicked: boolean) => {
  const context = canvas.getContext('2d');
  if (context == null) {
    return;
  }

  const row = keyRowCol.split(',')[0];
  const col = keyRowCol.split(',')[1];

  const dpi = devicePixelRatio;
  const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
  canvas.width = canvasWidth * dpi;
  canvas.height = canvasHeight * dpi;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  context.scale(dpi, dpi);
  const fontFamily = 'Fira Sans, Arial Rounded MT, Arial Rounded MT Bold, Arial';
  const singleLabelMargin = { x: 4, y: 4 };

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.lineTo(0, 0);
  context.clip();

  context.fillStyle = legendColor;

  const fontSize = 12;
  const fontHeight = 0.75 * 26;
  context.font = `bold ${fontSize}px ${fontFamily}`;
  // context.fillText(`${row}, ${col}`, singleLabelMargin.x, singleLabelMargin.y + fontHeight);
};

export const paintKeycap = (
  canvas: HTMLCanvasElement,
  textureWidth: number,
  textureHeight: number,
  legendColor: string,
  label: any,
  keyRowCol: string,
  isClicked: boolean,
) => {
  const [canvasWidth, canvasHeight] = [CSSVarObject.keyWidth, CSSVarObject.keyHeight];
  canvas.width = canvasWidth * textureWidth - CSSVarObject.faceXPadding.reduce((x, y) => x + y, 0);
  canvas.height = canvasHeight * textureHeight - CSSVarObject.faceYPadding.reduce((x, y) => x + y, 0);

  const context = canvas.getContext('2d');
  if (context == null) {
    return;
  }

  const debug = false;
  if (debug) {
    paintDebugLines(canvas);
  }

  return paintKeycapLabel(canvas, legendColor, label, keyRowCol, isClicked);
};
