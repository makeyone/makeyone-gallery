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

type EditPostStabilizerRes = {
  editedPostId: number;
};
export class EditPostStabilizerOutput extends CoreOutput<EditPostStabilizerRes> {}
