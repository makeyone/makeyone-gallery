import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostSettingInput {
  postId!: number;

  isPublished!: boolean;
}

type EditPostSettingRes = {
  editedPostId: number;
};
export class EditPostSettingOutput extends CoreOutput<EditPostSettingRes> {}
