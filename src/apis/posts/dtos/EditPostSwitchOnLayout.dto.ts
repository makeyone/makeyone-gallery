import { CoreOutput } from '@/apis/common/dtos/output.dto';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostSwitchOnLayoutInput {
  postId!: number;

  switchId!: number;

  keys!: KeyRowCol[];
}

type EditPostSwitchOnLayoutRes = {
  editedPostId: number;
};
export class EditPostSwitchOnLayoutOutput extends CoreOutput<EditPostSwitchOnLayoutRes> {}
