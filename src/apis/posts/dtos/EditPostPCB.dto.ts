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

type EditPostPCBRes = {
  editedPostId: number;
};
export class EditPostPCBOutput extends CoreOutput<EditPostPCBRes> {}
