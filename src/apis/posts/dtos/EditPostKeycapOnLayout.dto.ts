import { CoreOutput } from '@/apis/common/dtos/output.dto';

import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostKeycapOnLayoutInput {
  postId!: number;

  keycapId!: number;

  keys!: KeyRowCol[];
}

export const EditPostKeycapOnLayoutError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
  KEYCAP_NOT_FOUND: '존재하지 않은 키캡입니다.',
} as const;

export class EditPostKeycapOnLayoutOutput extends CoreOutput<typeof EditPostKeycapOnLayoutError> {
  editedPostId?: number;
}
