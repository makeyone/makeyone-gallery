import { KeyRowCol } from '@/utils/keyboards/types/keyboard-rendering';

export class EditPostKeycapOnLayoutReq {
  readonly postId!: number;
  readonly keycapId!: number;
  readonly keys!: KeyRowCol[];
}
