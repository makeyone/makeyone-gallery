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

type EditPostKeycapRes = {
  editedPostId: number;
};
export class EditPostKeycapOutput extends CoreOutput<EditPostKeycapRes> {}
