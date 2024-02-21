import { KeyboardStabilizerMountUnion } from '@/apis/posts/enums/KeyboardStabilizerMount.enum';
import { KeyboardStabilizerTypeUnion } from '@/apis/posts/enums/KeyboardStabilizerType.enum';

export class PostStabilizerModel {
  id!: number;

  stabilizerName!: string;

  stabilizerType!: KeyboardStabilizerTypeUnion;

  stabilizerMount!: KeyboardStabilizerMountUnion;

  remark!: string | null;
}
