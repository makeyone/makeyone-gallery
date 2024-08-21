import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { CursorPaginationInput, CursorPaginationRes } from '@/apis/common/dtos/pagination.dto';
import { PostImageModel } from '@/apis/posts/models/PostImage.model';
import { UserModel } from '@/apis/users/models/User.model';

export class GetPostsInput extends CursorPaginationInput {}

type User = Pick<UserModel, 'id' | 'nickname' | 'profileImg'>;
type PostImage = Pick<PostImageModel, 'id' | 'imageUrl'>;

interface GetPostsRes extends CursorPaginationRes {
  posts: {
    id: number;
    createdAt: string;
    postTitle: string;
    postedUser: User;
    postImages: PostImage[];
  }[];
}
export class GetPostsOutput extends CoreOutput<GetPostsRes> {}
