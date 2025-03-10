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

const wrapTextWithEllipsis = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 2,
) => {
  let words = text.split(' '); // 단어 기준으로 나누기
  let lines: string[] = [];
  let line = '';

  for (let i = 0; i < words.length; i++) {
    let testLine = line ? `${line} ${words[i]}` : words[i];
    let testWidth = context.measureText(testLine).width;

    // 1️⃣ 단어를 추가했을 때 줄 너비 초과하는 경우
    if (testWidth > maxWidth && i > 0) {
      // 2️⃣ 줄 개수가 최대 줄 수를 초과하면 마지막 줄을 `...`으로 변경하고 종료
      if (lines.length === maxLines - 1) {
        while (context.measureText(line + '...').width > maxWidth) {
          line = line.slice(0, -1); // 한 글자씩 줄이기
        }
        lines.push(line + '...');
        return lines.forEach((l, index) => context.fillText(l, x, y + index * lineHeight));
      }

      // 3️⃣ 새 줄 추가 후 단어 다시 처리
      lines.push(line);
      line = words[i];
    } else {
      line = testLine;
    }
  }

  // 4️⃣ 마지막 줄이 maxLines보다 작다면 그대로 출력 (불필요한 ... 방지)
  if (lines.length < maxLines) {
    lines.push(line);
  }

  // 캔버스에 줄바꿈된 텍스트 그리기
  lines.forEach((l, index) => {
    context.fillText(l, x, y + index * lineHeight);
  });
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

  const fontSize = 7.5;
  const fontHeight = 0.95 * fontSize;
  const maxWidth = canvasWidth - 4; // 텍스트 최대 너비 (키캡 경계를 넘지 않도록)
  const fontFamily = 'Fira Sans, Arial Rounded MT, Arial Rounded MT Bold, Arial';

  context.font = `${fontSize}px ${fontFamily}`;

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.lineTo(0, 0);
  context.clip();

  const topLabelOffset = 1 * fontHeight;
  const bottomLabelOffset = 2.5 * fontHeight;

  const topLabelMargin = { x: 1.45, y: -4 };
  const bottomLabelMargin = { x: 1.45, y: 6 };

  if (registeredSwitch) {
    context.fillStyle = '#FFD580';

    wrapTextWithEllipsis(
      context,
      registeredSwitch.switchName,
      topLabelMargin.x,
      topLabelMargin.y + topLabelOffset + fontHeight,
      maxWidth,
      fontHeight,
      2,
    );
  }

  if (registeredKeycap) {
    context.fillStyle = '#FFB6C1';

    wrapTextWithEllipsis(
      context,
      registeredKeycap.keycapName,
      bottomLabelMargin.x,
      bottomLabelMargin.y + bottomLabelOffset + fontHeight,
      maxWidth,
      fontHeight,
      2,
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
