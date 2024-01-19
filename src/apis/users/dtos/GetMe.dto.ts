import { CoreOutput } from '@/apis/common/dtos/output.dto';
import { UserModel } from '@/apis/users/models/user.model';

export class GetMeOutput extends CoreOutput {
  me?: Pick<UserModel, 'id' | 'socialProvider' | 'email' | 'nickname' | 'profileImg' | 'role'>;
}
