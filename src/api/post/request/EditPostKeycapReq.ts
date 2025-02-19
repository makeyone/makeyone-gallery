import { KeyboardKeycapProfileUnion } from '@/constants/enum/KeyboardKeycapProfile.enum';
import { KeyboardKeycapTextureUnion } from '@/constants/enum/KeyboardKeycapTexture.enum';

export class EditPostKeycapReq {
  readonly postId!: number;
  readonly keycaps!: {
    readonly keycapId?: number;
    readonly keycapName: string;
    readonly keycapProfile: KeyboardKeycapProfileUnion;
    readonly keycapTexture: KeyboardKeycapTextureUnion;
    readonly manufacturer?: string | null;
    readonly remark?: string;
  }[];
}
