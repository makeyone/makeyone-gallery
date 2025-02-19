import { EditPostPlateRes } from '@/api/post/response/EditPostPlateRes';

export class EditPostPlateViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostPlateRes: EditPostPlateRes): EditPostPlateViewModel {
    return new EditPostPlateViewModel(editPostPlateRes.editedPostId);
  }
}
