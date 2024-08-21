import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { PostFoamModel } from '@/apis/posts/models/PostFoam.model';
import { PostHousingModel } from '@/apis/posts/models/PostHousing.model';
import { PostImageModel } from '@/apis/posts/models/PostImage.model';
import { PostKeyboardDefinitionModel } from '@/apis/posts/models/PostKeyboardDefinition.model';
import { PostKeycapModel } from '@/apis/posts/models/PostKeycap.model';
import { PostPlateModel } from '@/apis/posts/models/PostPlate.model';
import { PostPrintedCircuitBoardModel } from '@/apis/posts/models/PostPrintedCircuitBoard.model';
import { PostStabilizerModel } from '@/apis/posts/models/PostStabilizer.model';
import { PostSwitchModel } from '@/apis/posts/models/PostSwitch.model';
import { PostVideoModel } from '@/apis/posts/models/PostVideo.model';
import { UserModel } from '@/apis/users/models/User.model';

export class GetPostByIdInput {
  postId!: number;
}

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
type PostPrintedCircuitBoard = Pick<
  PostPrintedCircuitBoardModel,
  'id' | 'pcbName' | 'pcbThickness' | 'pcbType' | 'isFlexCutPcb' | 'isRgbPcb' | 'remark'
>;
type PostPlate = Pick<PostPlateModel, 'id' | 'plateName' | 'plateTexture' | 'isHalfPlate' | 'isFlexCutPlate' | 'remark'>;
type PostFoam = Pick<PostFoamModel, 'id' | 'plateBetweenPCBFoam' | 'bottomSwitchPEFoam' | 'bottomFoam' | 'tapeMod' | 'remark'>;
type PostVideo = Pick<PostVideoModel, 'id' | 'youtubeVideoUrl' | 'youtubeVideoId' | 'remark'>;

export type GetPostByIdRes = {
  id: number;
  createdAt: string;
  postTitle: string;
  postContent: string;
  isPublished: boolean;
  postedUser: User;
  postImages: PostImage[];
  postHousing: PostHousing | null;
  postSwitches: PostSwitch[];
  postKeycaps: PostKeycap[];
  postStabilizers: PostStabilizer[];
  postKeyboardDefinition: PostKeyboardDefinition | null;
  postPrintedCircuitBoard: PostPrintedCircuitBoard | null;
  postPlate: PostPlate | null;
  postFoam: PostFoam | null;
  postVideo: PostVideo | null;
};

export class GetPostByIdOutput extends CoreOutput<GetPostByIdRes> {}
