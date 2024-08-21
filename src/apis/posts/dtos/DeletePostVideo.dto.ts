import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class DeletePostVideoInput {
  postId!: number;
}

type DeletePostVideoRes = {
  deletedPostId: number;
};
export class DeletePostVideoOutput extends CoreOutput<DeletePostVideoRes> {}
