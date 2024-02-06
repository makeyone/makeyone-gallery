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

const paintKeycapLabel = (canvas: HTMLCanvasElement, legendColor: string, label: any) => {
  const context = canvas.getContext('2d');
  if (context == null) {
    return;
  }
  const dpi = devicePixelRatio;
  const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
  canvas.width = canvasWidth * dpi;
  canvas.height = canvasHeight * dpi;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  context.scale(dpi, dpi);
  const fontFamily = 'Fira Sans, Arial Rounded MT, Arial Rounded MT Bold, Arial';
  const topLabelMargin = { x: 4, y: 4 };
  const bottomLabelMargin = { x: 4, y: 4 };
  const centerLabelMargin = { x: 3, y: 0 };
  const singleLabelMargin = { x: 4, y: 4 };
  console.log(label);

  context.beginPath();
  context.clip();
  context.fillStyle = legendColor;
  if (label === undefined) {
    //
  } else if (label.topLabel && label.bottomLabel) {
    const fontSize = 16;
    const fontHeight = 0.75 * fontSize;
    const topLabelOffset = label.offset[0] * fontHeight;
    const bottomLabelOffset = label.offset[1] * fontHeight;
    context.font = `bold ${fontSize}px ${fontFamily}`;
    context.fillText(label.topLabel, topLabelMargin.x, topLabelMargin.y + topLabelOffset + fontHeight);
    context.fillText(label.bottomLabel, bottomLabelMargin.x, canvasHeight - bottomLabelMargin.y - bottomLabelOffset);
  } else if (label.centerLabel) {
    const fontSize = 13 * label.size;
    const fontHeight = 0.75 * fontSize;
    const faceMidLeftY = canvasHeight / 2;
    context.font = `bold ${fontSize}px ${fontFamily}`;
    context.fillText(label.label, centerLabelMargin.x, faceMidLeftY + 0.5 * fontHeight);
    // return if label would have overflowed so that we know to show tooltip
    return context.measureText(label.centerLabel).width > canvasWidth - centerLabelMargin.x;
  } else if (typeof label.label === 'string') {
    const fontSize = 22;
    const fontHeight = 0.75 * fontSize;
    context.font = `bold ${fontSize}px ${fontFamily}`;
    context.fillText(label.label, singleLabelMargin.x, singleLabelMargin.y + fontHeight);
  }
};

export const paintKeycap = (
  canvas: HTMLCanvasElement,
  textureWidth: number,
  textureHeight: number,
  legendColor: string,
  label: any,
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

  return paintKeycapLabel(canvas, legendColor, label);
};
