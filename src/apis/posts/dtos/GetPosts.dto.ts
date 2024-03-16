import { CursorPaginationInput, CursorPaginationOutput } from '@/apis/common/dtos/pagination.dto';
import { PostModel } from '@/apis/posts/models/Post.model';
import { PostImageModel } from '@/apis/posts/models/PostImage.model';
import { UserModel } from '@/apis/users/models/User.model';

export class GetPostsInput extends CursorPaginationInput {}

type Post = Pick<PostModel, 'id' | 'createdAt' | 'postTitle'>;
type User = Pick<UserModel, 'id' | 'nickname' | 'profileImg'>;
type PostImage = Pick<PostImageModel, 'id' | 'imageUrl'>;

export class GetPostsOutput extends CursorPaginationOutput {
  posts?: (Post & {
    postedUser: User;
    postImages: PostImage[];
  })[];
}
