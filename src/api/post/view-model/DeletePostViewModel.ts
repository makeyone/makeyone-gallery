import { DeletePostRes } from '@/api/post/response/DeletePostRes';

export class DeletePostViewModel {
  constructor(readonly deletedPostId: number) {}

  static of(deletePostRes: DeletePostRes): DeletePostViewModel {
    return new DeletePostViewModel(deletePostRes.deletedPostId);
  }
}
