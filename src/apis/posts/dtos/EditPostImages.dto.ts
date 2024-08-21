import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostImagesInput {
  postId!: number;

  postImageList!: string[];
}

type EditPostImagesRes = {
  editedPostId: number;
};
export class EditPostImagesOutput extends CoreOutput<EditPostImagesRes> {}
