import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { UserModel } from '@/apis/users/models/User.model';

type GetMeResData = Pick<UserModel, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
export class GetMeOutput extends CoreOutput<GetMeResData> {}
