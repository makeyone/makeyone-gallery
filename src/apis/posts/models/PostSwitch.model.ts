import { KeyboardSwitchLubeUnion } from '@/apis/posts/enums/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@/apis/posts/enums/KeyboardSwitchType.enum';

export class PostSwitchModel {
  id!: number;

  switchName!: string;

  switchType!: KeyboardSwitchTypeUnion;

  isSlientSwitch!: boolean;

  switchLube!: KeyboardSwitchLubeUnion;

  bottomOutForce!: number | null;

  springLength!: number | null;

  switchFilm!: string | null;

  remark!: string | null;
}
