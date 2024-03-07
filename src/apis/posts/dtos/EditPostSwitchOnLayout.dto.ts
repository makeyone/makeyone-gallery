import { CoreOutput } from '@/apis/common/dtos/output.dto';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostSwitchOnLayoutInput {
  postId!: number;

  switchId!: number;

  keys!: KeyRowCol[];
}

export const EditPostSwitchOnLayoutError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
  SWITCH_NOT_FOUND: '존재하지 않은 스위치입니다.',
} as const;

export class EditPostSwitchOnLayoutOutput extends CoreOutput<typeof EditPostSwitchOnLayoutError> {
  editedPostId?: number;
}
