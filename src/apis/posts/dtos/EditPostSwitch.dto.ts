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

type EditPostSwitchRes = {
  editedPostId: number;
};
export class EditPostSwitchOutput extends CoreOutput<EditPostSwitchRes> {}
