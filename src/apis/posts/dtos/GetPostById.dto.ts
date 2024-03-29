import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostModel } from '@/apis/posts/models/Post.model';
import { PostFoamModel } from '@/apis/posts/models/PostFoam.model';
import { PostHousingModel } from '@/apis/posts/models/PostHousing.model';
import { PostImageModel } from '@/apis/posts/models/PostImage.model';
import { PostKeyboardDefinitionModel } from '@/apis/posts/models/PostKeyboardDefinition.model';
import { PostKeycapModel } from '@/apis/posts/models/PostKeycap.model';
import { PostPCBModel } from '@/apis/posts/models/PostPCB.model';
import { PostPlateModel } from '@/apis/posts/models/PostPlate.model';
import { PostSettingModel } from '@/apis/posts/models/PostSetting.model';
import { PostStabilizerModel } from '@/apis/posts/models/PostStabilizer.model';
import { PostSwitchModel } from '@/apis/posts/models/PostSwitch.model';
import { PostVideoModel } from '@/apis/posts/models/PostVideo.model';
import { UserModel } from '@/apis/users/models/User.model';

export class GetPostByIdInput {
  postId!: number;
}

export const GetPostByIdError = {
  POST_NOT_FOUND: '존재하지 않는 게시글입니다.',
} as const;

type Post = Pick<PostModel, 'id' | 'createdAt' | 'postTitle' | 'postContent'>;
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
type PostSwitch = Pick<
  PostSwitchModel,
  | 'id'
  | 'switchName'
  | 'switchType'
  | 'isSlientSwitch'
  | 'switchLube'
  | 'bottomOutForce'
  | 'springLength'
  | 'switchFilm'
  | 'remark'
>;
type PostKeycap = Pick<PostKeycapModel, 'id' | 'keycapName' | 'keycapProfile' | 'keycapTexture' | 'manufacturer' | 'remark'>;
type PostStabilizer = Pick<PostStabilizerModel, 'id' | 'stabilizerName' | 'stabilizerType' | 'stabilizerMount' | 'remark'>;
type PostKeyboardDefinition = Pick<
  PostKeyboardDefinitionModel,
  'id' | 'definitionName' | 'keyboardDefinition' | 'layoutOptionKeys'
>;
type PostPCB = Pick<PostPCBModel, 'id' | 'pcbName' | 'pcbThickness' | 'pcbType' | 'isFlexCutPcb' | 'isRgbPcb' | 'remark'>;
type PostPlate = Pick<PostPlateModel, 'id' | 'plateName' | 'plateTexture' | 'isHalfPlate' | 'isFlexCutPlate' | 'remark'>;
type PostFoam = Pick<PostFoamModel, 'id' | 'plateBetweenPCBFoam' | 'bottomSwitchPEFoam' | 'bottomFoam' | 'tapeMod' | 'remark'>;
type PostVideo = Pick<PostVideoModel, 'id' | 'youtubeVideoUrl' | 'youtubeVideoId' | 'remark'>;
type PostSetting = Pick<PostSettingModel, 'id' | 'isPublished'>;

export type GetPostById = Post & {
  postedUser: User;
  postImages: PostImage[];
  postHousing: PostHousing | null;
  postSwitches: PostSwitch[];
  postKeycaps: PostKeycap[];
  postStabilizers: PostStabilizer[];
  postKeyboardDefinition: PostKeyboardDefinition | null;
  postPCB: PostPCB | null;
  postPlate: PostPlate | null;
  postFoam: PostFoam | null;
  postVideo: PostVideo | null;
  postSetting: PostSetting | null;
};

export class GetPostByIdOutput extends CoreOutput<typeof GetPostByIdError> {
  post?: GetPostById;
}
