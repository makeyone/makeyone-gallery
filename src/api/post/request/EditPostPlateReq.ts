import { KeyboardPlateTextureUnion } from '@/constants/enum/KeyboardPlateTexture.enum';

export class EditPostPlateReq {
  readonly postId!: number;
  readonly plateName!: string;
  readonly plateTexture!: KeyboardPlateTextureUnion;
  readonly isFlexCutPlate!: boolean;
  readonly isHalfPlate!: boolean;
  readonly remark?: string;
}
