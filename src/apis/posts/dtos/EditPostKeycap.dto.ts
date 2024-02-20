import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardKeycapProfileUnion } from '@/apis/posts/enums/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@/apis/posts/enums/KeyboardKeycapTexture.enum';

class EditPostKeycap {
  keycapId?: number;

  keycapName!: string;

  keycapProfile!: KeyboardKeycapProfileUnion;

  keycapTexture!: KeyboardKeycapTextureUnion;

  manufacturer?: string | null;

  remark?: string;
}

export class EditPostKeycapInput {
  postId!: number;

  keycaps!: EditPostKeycap[];
}

export const EditPostKeycapError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostKeycapOutput extends CoreOutput<typeof EditPostKeycapError> {
  editedPostId?: number;
}
