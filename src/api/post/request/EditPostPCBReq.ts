import { KeyboardPCBTypeUnion } from '@/constants/enum/KeyboardPCBType.enum';

export class EditPostPCBReq {
  readonly postId!: number;
  readonly pcbName!: string;
  readonly pcbType!: KeyboardPCBTypeUnion;
  readonly isRgbPcb!: boolean;
  readonly isFlexCutPcb!: boolean;
  readonly pcbThickness?: number;
  readonly remark?: string;
}
