import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostTitleInput {
  postId!: number;

  postTitle!: string;
}

type EditPostTitleRes = {
  editedPostId: number;
};
export class EditPostTitleOutput extends CoreOutput<EditPostTitleRes> {}
