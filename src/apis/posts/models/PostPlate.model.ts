import { KeyboardPlateTextureUnion } from '@/apis/posts/enums/KeyboardPlateTexture.enum';

export class PostPlateModel {
  id!: number;

  plateName!: string;

  plateTexture!: KeyboardPlateTextureUnion;

  isFlexCutPlate!: boolean;

  isHalfPlate!: boolean;

  remark!: string | null;
}
