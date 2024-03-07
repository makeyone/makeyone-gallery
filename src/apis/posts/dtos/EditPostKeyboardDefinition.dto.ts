import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostKeyboardDefinitionModel } from '@/apis/posts/models/PostKeyboardDefinition.model';

export class EditPostKeyboardDefinitionInput {
  postId!: number;

  keyboardDefinition!: VIADefinitionV2 | VIADefinitionV3;

  layoutOptionKeys?: number[];
}

export const EditPostKeyboardDefinitionError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostKeyboardDefinitionOutput extends CoreOutput<typeof EditPostKeyboardDefinitionError> {
  editedPostId?: number;
  editedKeyboardDefinition?: Pick<
    PostKeyboardDefinitionModel,
    'id' | 'definitionName' | 'keyboardDefinition' | 'layoutOptionKeys'
  >;
}
