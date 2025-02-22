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

type PaintKeycapLabelProps = {
  canvas: HTMLCanvasElement;
  keyRow: number;
  keyCol: number;
  registeredSwitch?: {
    id: number;
    switchName: string;
  };
  registeredKeycap?: {
    id: number;
    keycapName: string;
  };
};
const paintKeycapLabel = ({ canvas, registeredSwitch, registeredKeycap }: PaintKeycapLabelProps) => {
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
  // const centerLabelMargin = { x: 3, y: 0 };
  // const faceMidLeftY = canvasHeight / 2;

  const topLabelMargin = { x: 2, y: 1 };
  const bottomLabelMargin = { x: 2, y: 4 };

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.lineTo(0, 0);
  context.clip();

  context.fillStyle = '#fff';

  const fontSize = 11;
  const fontHeight = 0.75 * fontSize;
  context.font = `bold ${fontSize}px ${fontFamily}`;

  const topLabelOffset = 1 * fontHeight;
  const bottomLabelOffset = 2.5 * fontHeight;

  if (registeredSwitch) {
    context.fillText(
      `${registeredSwitch.switchName.replace(/ /gi, '').substring(0, 3)}..`,
      topLabelMargin.x,
      topLabelMargin.y + topLabelOffset + fontHeight,
    );
  }

  if (registeredKeycap) {
    context.fillText(
      `${registeredKeycap.keycapName.replace(/ /gi, '').substring(0, 3)}..`,
      bottomLabelMargin.x,
      bottomLabelMargin.y + bottomLabelOffset + fontHeight,
    );
  }
};

type PaintKeycapProps = {
  canvas: HTMLCanvasElement;
  textureWidth: number;
  textureHeight: number;
  keyRow: number;
  keyCol: number;
  registeredSwitch?: {
    id: number;
    switchName: string;
  };
  registeredKeycap?: {
    id: number;
    keycapName: string;
  };
};
export const paintKeycap = ({
  canvas,
  textureWidth,
  textureHeight,
  keyRow,
  keyCol,
  registeredSwitch,
  registeredKeycap,
}: PaintKeycapProps) => {
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

  return paintKeycapLabel({
    canvas,
    keyRow,
    keyCol,
    registeredSwitch,
    registeredKeycap,
  });
};
