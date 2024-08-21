import { CoreOutput } from '@/apis/common/dtos/output.dto';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostKeycapOnLayoutInput {
  postId!: number;

  keycapId!: number;

  keys!: KeyRowCol[];
}

type EditPostKeycapOnLayoutRes = {
  editedPostId: number;
};
export class EditPostKeycapOnLayoutOutput extends CoreOutput<EditPostKeycapOnLayoutRes> {}
