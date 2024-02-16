import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostModel } from '@/apis/posts/models/post.model';
import { UserModel } from '@/apis/users/models/user.model';

export class GetPostByIdInput {
  postId!: number;
}

export const GetPostByIdError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
} as const;

type Post = Pick<PostModel, 'id' | 'createdAt'>;
type User = Pick<UserModel, 'id' | 'nickname' | 'profileImg'>;
export type GetPostById = Post & { postedUser: User };
export class GetPostByIdOutput extends CoreOutput<typeof GetPostByIdError> {
  post?: GetPostById;
}
