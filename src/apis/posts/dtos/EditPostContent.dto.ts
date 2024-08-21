import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostContentInput {
  postId!: number;

  postContent?: string;
}

type EditPostContentRes = {
  editedPostId: number;
};
export class EditPostContentOutput extends CoreOutput<EditPostContentRes> {}
