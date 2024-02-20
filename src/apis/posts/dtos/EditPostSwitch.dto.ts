import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardSwitchLubeUnion } from '@/apis/posts/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@/apis/posts/enums/KeyboardSwitchType.enum';

class EditPostSwitch {
  switchId?: number;

  switchName!: string;

  switchType!: KeyboardSwitchTypeUnion;

  isSlientSwitch!: boolean;

  switchLube!: KeyboardSwitchLubeUnion;

  bottomOutForce?: number;

  springLength?: number;

  switchFilm?: string;

  remark?: string;
}

export class EditPostSwitchInput {
  postId!: number;

  switches!: EditPostSwitch[];
}

export const EditPostSwitchError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostSwitchOutput extends CoreOutput<typeof EditPostSwitchError> {
  editedPostId?: number;
}
