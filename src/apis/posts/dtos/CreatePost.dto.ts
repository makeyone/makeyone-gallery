import { CoreOutput } from '@/apis/common/dtos/output.dto';

type CreatePostRes = {
  createdPostId: number;
};
export class CreatePostOutput extends CoreOutput<CreatePostRes> {}
