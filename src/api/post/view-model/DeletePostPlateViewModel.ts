import { DeletePostPlateRes } from '@/api/post/response/DeletePostPlateRes';

export class DeletePostPlateViewModel {
  constructor(readonly deletedPostId: number) {}

  static of(deletePostPlateRes: DeletePostPlateRes): DeletePostPlateViewModel {
    return new DeletePostPlateViewModel(deletePostPlateRes.deletedPostId);
  }
}
