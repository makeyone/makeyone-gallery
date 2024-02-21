import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardStabilizerMountUnion } from '@/apis/posts/enums/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@/apis/posts/enums/KeyboardStabilizerType.enum';

class EditPostStabilizer {
  stabilizerId?: number;

  stabilizerName!: string;

  stabilizerType!: KeyboardStabilizerTypeUnion;

  stabilizerMount!: KeyboardStabilizerMountUnion;

  manufacturer?: string | null;

  remark?: string;
}

export class EditPostStabilizerInput {
  postId!: number;

  stabilizers!: EditPostStabilizer[];
}

export const EditPostStabilizerError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostStabilizerOutput extends CoreOutput<typeof EditPostStabilizerError> {
  editedPostId?: number;
}
