import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostKeyboardLayoutModel } from '@/apis/posts/models/PostKeyboardLayout.model';

export class EditPostKeyboardLayoutInput {
  postId!: number;

  keyboardLayout!: VIADefinitionV2 | VIADefinitionV3;

  layoutOptions?: number[];
}

export const EditPostKeyboardLayoutError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostKeyboardLayoutOutput extends CoreOutput<typeof EditPostKeyboardLayoutError> {
  editedPostId?: number;
  editedKeyboardLayout?: Pick<PostKeyboardLayoutModel, 'id' | 'layoutName' | 'keyboardLayout' | 'layoutOptions'>;
}
