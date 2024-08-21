import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class EditPostVideoInput {
  postId!: number;

  youtubeVideoUrl!: string;
}

type EditPostVideoRes = {
  editedPostId: number;
};
export class EditPostVideoOutput extends CoreOutput<EditPostVideoRes> {}
