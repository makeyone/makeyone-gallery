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

export const EditPostPlateError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostPlateOutput extends CoreOutput<typeof EditPostPlateError> {
  editedPostId?: number;
}
