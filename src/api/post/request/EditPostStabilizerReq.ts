import { KeyboardStabilizerMountUnion } from '@/constants/enum/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@/constants/enum/KeyboardStabilizerType.enum';

export class EditPostStabilizerReq {
  readonly postId!: number;
  readonly stabilizers!: {
    stabilizerId?: number;
    stabilizerName: string;
    stabilizerType: KeyboardStabilizerTypeUnion;
    stabilizerMount: KeyboardStabilizerMountUnion;
    manufacturer?: string | null;
    remark?: string;
  }[];
}
