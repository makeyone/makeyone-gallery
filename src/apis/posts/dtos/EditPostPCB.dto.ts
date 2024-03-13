import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { KeyboardPCBTypeUnion } from '@/apis/posts/enums/KeyboardPCBType.enum';

export class EditPostPCBInput {
  postId!: number;

  pcbName!: string;

  pcbType!: KeyboardPCBTypeUnion;

  isRgbPcb!: boolean;

  isFlexCutPcb!: boolean;

  pcbThickness?: number;

  remark?: string;
}

export const EditPostPCBError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
  UNAUTHORIZED_POST: '잘못된 접근입니다. 다시 시도해주세요.',
} as const;

export class EditPostPCBOutput extends CoreOutput<typeof EditPostPCBError> {
  editedPostId?: number;
}
