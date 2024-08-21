import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardPlateTextureUnion } from '@/apis/posts/enums/KeyboardPlateTexture.enum';

export class EditPostPlateInput {
  postId!: number;

  plateName!: string;

  plateTexture!: KeyboardPlateTextureUnion;

  isFlexCutPlate!: boolean;

  isHalfPlate!: boolean;

  remark?: string;
}

type EditPostPlateRes = {
  editedPostId: number;
};
export class EditPostPlateOutput extends CoreOutput<EditPostPlateRes> {}
