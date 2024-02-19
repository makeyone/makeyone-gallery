import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { UserModel } from '@/apis/users/models/User.model';

export class GetMeOutput extends CoreOutput {
  me?: Pick<UserModel, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
