import { WithdrawalUserRes } from '@/api/user/response/WithdrawalUserRes';

export class WithdrawalUserViewModel {
  constructor(readonly withdrawalUserId: number) {}

  static of(editUserResponse: WithdrawalUserRes): WithdrawalUserViewModel {
    return new WithdrawalUserViewModel(editUserResponse.withdrawalUserId);
  }
}
