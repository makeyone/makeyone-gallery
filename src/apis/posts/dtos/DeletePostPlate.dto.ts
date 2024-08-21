import { CoreOutput } from '@/apis/common/dtos/output.dto';

export class DeletePostPlateInput {
  postId!: number;
}

type DeletePostPlateRes = {
  deletedPostId: number;
};
export class DeletePostPlateOutput extends CoreOutput<DeletePostPlateRes> {}
