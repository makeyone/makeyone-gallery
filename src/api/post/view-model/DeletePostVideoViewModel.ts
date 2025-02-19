import { DeletePostVideoRes } from '@/api/post/response/DeletePostVideoRes';

export class DeletePostVideoViewModel {
  constructor(readonly deletedPostId: number) {}

  static of(deletePostVideoRes: DeletePostVideoRes): DeletePostVideoViewModel {
    return new DeletePostVideoViewModel(deletePostVideoRes.deletedPostId);
  }
}
