import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostModel } from '@/apis/posts/models/Post.model';
import { PostHousingModel } from '@/apis/posts/models/PostHousing.model';
import { PostImageModel } from '@/apis/posts/models/PostImage.model';
import { UserModel } from '@/apis/users/models/User.model';

export class GetPostByIdInput {
  postId!: number;
}

export const GetPostByIdError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
} as const;

type Post = Pick<PostModel, 'id' | 'createdAt' | 'postTitle'>;
type User = Pick<UserModel, 'id' | 'nickname' | 'profileImg'>;
type PostImage = Pick<PostImageModel, 'id' | 'imageUrl'>;
type PostHousing = Pick<
  PostHousingModel,
  | 'id'
  | 'housingName'
  | 'housingColor'
  | 'housingMount'
  | 'housingLayout'
  | 'housingWindowKeyLayout'
  | 'housingFunctionKeyLayout'
  | 'isHousingReAnodized'
>;

export type GetPostById = Post & {
  postedUser: User;
  postImages: PostImage[];
  postHousing: PostHousing | null;
};

export class GetPostByIdOutput extends CoreOutput<typeof GetPostByIdError> {
  post?: GetPostById;
}
