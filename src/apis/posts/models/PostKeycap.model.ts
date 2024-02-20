import { KeyboardKeycapProfileUnion } from '@/apis/posts/enums/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@/apis/posts/enums/KeyboardKeycapTexture.enum';

export class PostKeycapModel {
  id!: number;

  keycapName!: string;

  keycapProfile!: KeyboardKeycapProfileUnion;

  keycapTexture!: KeyboardKeycapTextureUnion;

  manufacturer!: string | null;

  remark!: string | null;
}
