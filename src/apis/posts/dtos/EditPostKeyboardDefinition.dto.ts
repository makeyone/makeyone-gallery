import { VIADefinitionV2, VIADefinitionV3 } from '@the-via/reader';

import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostKeyboardDefinitionModel } from '@/apis/posts/models/PostKeyboardDefinition.model';

export class EditPostKeyboardDefinitionInput {
  postId!: number;

  keyboardDefinition!: VIADefinitionV2 | VIADefinitionV3;

  layoutOptionKeys?: number[];
}

type EditPostKeyboardDefinitionRes = {
  editedPostId: number;
  editedKeyboardDefinition: Pick<
    PostKeyboardDefinitionModel,
    'id' | 'definitionName' | 'keyboardDefinition' | 'layoutOptionKeys'
  >;
};
export class EditPostKeyboardDefinitionOutput extends CoreOutput<EditPostKeyboardDefinitionRes> {}
