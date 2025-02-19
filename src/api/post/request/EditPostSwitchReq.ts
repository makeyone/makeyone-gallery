import { KeyboardSwitchLubeUnion } from '@/constants/enum/KeyboardSwitchLube.enum';
import { KeyboardSwitchTypeUnion } from '@/constants/enum/KeyboardSwitchType.enum';

export class EditPostSwitchReq {
  readonly postId!: number;
  readonly switches!: {
    readonly switchId?: number;
    readonly switchName: string;
    readonly switchType: KeyboardSwitchTypeUnion;
    readonly isSlientSwitch: boolean;
    readonly switchLube: KeyboardSwitchLubeUnion;
    readonly bottomOutForce?: number;
    readonly springLength?: number;
    readonly switchFilm?: string;
    readonly remark?: string;
  }[];
}
