import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostSwitchOnLayoutReq {
  readonly postId!: number;
  readonly switchId!: number;
  readonly keys!: KeyRowCol[];
}
