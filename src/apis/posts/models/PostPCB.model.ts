import { KeyboardPCBTypeUnion } from '@/apis/posts/enums/KeyboardPCBType.enum';

export class PostPCBModel {
  id!: number;

  pcbName!: string;

  pcbThickness!: number | null;

  pcbType!: KeyboardPCBTypeUnion;

  isRgbPcb!: boolean;

  isFlexCutPcb!: boolean;

  remark!: string | null;
}
