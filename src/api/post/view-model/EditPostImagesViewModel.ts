import { EditPostImagesRes } from '@/api/post/response/EditPostImagesRes';

export class EditPostImagesViewModel {
  constructor(readonly editedPostId: number) {}

  static of(editPostImagesRes: EditPostImagesRes): EditPostImagesViewModel {
    return new EditPostImagesViewModel(editPostImagesRes.editedPostId);
  }
}
